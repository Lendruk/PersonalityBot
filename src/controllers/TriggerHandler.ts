import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { BotConfig } from "../types/BotConfig";
import { Trigger } from "../types/Trigger";

@injectable()
export default class TriggerHandler {
  private triggers: Trigger[];
  
  public constructor(
    @inject("BotConfig") botConfig: BotConfig,
  ) {
    this.triggers = botConfig.triggers;
  }

  public processTriggers(message: Message): void {
    for(const trigger of this.triggers) {
      for(const triggerWord of trigger.triggerWords) {
        if(message.content.includes(triggerWord)) {
          const triggerResult = this.executeTrigger(trigger);
          if(triggerResult) {
            message.reply(triggerResult);
          }
        }
      }
    }
  }

  private executeTrigger(trigger: Trigger): string | undefined {
    for(const action of trigger.actions) {
      const script = require(`../actions/${action.script}.js`).default;
      
      const res = script(undefined);
      return res;
    }
  }

}
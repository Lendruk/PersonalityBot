import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { ActionType } from "../types/Action";
import { BotConfig } from "../types/BotConfig";
import { Argument, Command } from "../types/Command";
import StartableService from "../types/StartableService";
import { cleanSpecialCharacters } from "../utils/textUtils";

type FindCommandResult = {
  command?: Command;
  closestMatchesOrdered: Command[],
}

@injectable()
export default class CommandService implements StartableService {
  private availableCommands: Command[];
  constructor(
    @inject("BotConfig") private botConfig: BotConfig,
  ) {
    this.availableCommands = this.botConfig.commands;
  }

  public start(): void {

  }

  public getAllCommands(): Command[] {
    return this.availableCommands;
  }

  public processCommand(message: Message): void {
    let tokens = message.content.trim().replace(/\s\s+/g, ' ').split(' ');
    const commandKey = tokens.splice(0,1)[0];
    // Clean Input
    tokens = tokens.map(token => cleanSpecialCharacters(token));
    const possibleCommands = this.availableCommands.filter(cmd => cmd.key === commandKey); 

    if(possibleCommands.length > 0) {
      const cmdResult = this.findCommand(possibleCommands, tokens);
      if(!cmdResult.command) {
        message.channel.send(this.botConfig.responses.noKnowledge[0]);
      }
      console.log(tokens);
    } else {
      message.channel.send(this.botConfig.responses.notFound[0]);
    }
  }

  private findCommand(possibleCommands: Command[], normalizedTokens: string[]): FindCommandResult {
    const cmdResult: FindCommandResult = { closestMatchesOrdered: [] };
    const hitsDict: Map<number, number> = new Map();
    const joinedInput = normalizedTokens.join(' ');
    for(let i = 0; i < possibleCommands.length; i++) {
      const command = possibleCommands[i];
      for(const arg of command.args) {
        let argHits = 0;
        const semanthics = arg.semanthicText;

        for(const text of semanthics) {
          if(joinedInput.includes(text.replace(/[\?!]*(<value>)*/g, ''))){
            argHits++;
          }
        }
      }
    }

    return cmdResult;
  }
}
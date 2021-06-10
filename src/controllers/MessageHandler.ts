import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import Discord from "./Discord";
import { BotConfig } from "../types/BotConfig";
import StartableService from "../types/StartableService";
import CommandService from "./CommandService";

@injectable()
export default class MessageHandler implements StartableService {
  constructor(
    @inject("Discord") private discordService: Discord,
    @inject("BotConfig") private botConfig: BotConfig,
    @inject("CommandService") private commandService: CommandService,
  ) {}

  /**
   * Starts the message handler
   */
  public start(): void {
    this.discordService.onMessage().subscribe(msg =>  this.handleMessage(msg));
  }
  
  private handleMessage(message: Message): void {
    if(message.author.id === this.botConfig.id) return;
    
    if(message.content.includes("dev")) {
      message.channel.send("<@315534723847815168> responds");
    }

    this.commandService.processCommand(message);
  }
} 
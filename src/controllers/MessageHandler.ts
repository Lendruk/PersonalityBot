import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import Discord from "./Discord";
import { BotConfig } from "../types/BotConfig";
import StartableService from "../types/StartableService";

@injectable()
export default class MessageHandler implements StartableService {
  constructor(
    @inject("Discord") private discordService: Discord,
    @inject("BotConfig") private botConfig: BotConfig,
  ) {}

  public start(): void {
    this.discordService.onMessage().subscribe(msg =>  this.handleMessage(msg));
  }
  
  private handleMessage(message: Message): void {
    if(message.author.id === this.botConfig.id) return;
    
    if(message.content.includes("dev")) {
      message.channel.send("responds");
    }
  }
}
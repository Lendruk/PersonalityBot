import { Client, Message } from 'discord.js';
import { injectable } from 'inversify';
import { fromEventPattern, Observable } from 'rxjs';
import StartableService from '../types/StartableService';

@injectable()
export default class Discord implements StartableService {
  private client: Client;
  private onMessage$: Observable<Message>;

  constructor() {
    this.client = new Client();

    this.onMessage$ = fromEventPattern<Message>(handler => this.client.on('message', handler));
  }
  start(): void {
    this.client.login(process.env.BOT_TOKEN);
  }
  
  public sendMessage(message: Message): void {
    this.client.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return this.onMessage$;
  }

  public getClient(): Client {
    return this.client;
  }
}
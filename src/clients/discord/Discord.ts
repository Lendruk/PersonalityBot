import { Client, Message } from 'discord.js';
import { fromEventPattern, Observable } from 'rxjs';

export default class Discord {
  private client: Client;
  private onMessage$: Observable<Message>;

  constructor() {
    this.client = new Client();

    this.onMessage$ = fromEventPattern<Message>(handler => this.client.on('message', handler));
  }

  public start(): void {
    this.client.login(process.env.BOT_TOKEN);
  }

  public sendMessage(message: string): void {
  }

  public onMessage(): Observable<Message> {
    return this.onMessage$;
  }
}
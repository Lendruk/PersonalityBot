import { Container, ContainerModule, interfaces } from "inversify";
import Discord from "../controllers/Discord";
import MessageHandler from "../controllers/MessageHandler";
import IocContainer from "../types/IocContainer";
import botConfig from '../config.json';
import { BotConfig } from "../types/BotConfig";
import CommandService from "../controllers/CommandService";
import TriggerHandler from "../controllers/TriggerHandler";

export default class BaseModule implements IocContainer {
  private module: ContainerModule;
  constructor() {
    this.module = new ContainerModule((bind: interfaces.Bind) => {

      bind<Discord>("Discord").to(Discord).inSingletonScope();
      bind<MessageHandler>("MessageHandler").to(MessageHandler).inSingletonScope();
      bind<CommandService>("CommandService").to(CommandService).inSingletonScope();
      bind<TriggerHandler>("TriggerHandler").to(TriggerHandler).inSingletonScope();
      bind<BotConfig>("BotConfig").toConstantValue(botConfig as BotConfig);
    });
  }

  getContainerModule(): ContainerModule {
    return this.module;
  }

  async start(container: Container): Promise<void> {
   container.load(this.module);

   await Promise.race([
      container.get<Discord>("Discord").start(),
      container.get<MessageHandler>("MessageHandler").start(),
      container.get<CommandService>("CommandService").start()
   ]);
  }
}

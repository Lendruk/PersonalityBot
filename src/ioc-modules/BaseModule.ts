import { ContainerModule, interfaces } from "inversify";
import IocContainer from "../types/IocContainer";

export default class BaseModule implements IocContainer {
  private module: ContainerModule;
  constructor() {
    this.module = new ContainerModule((bind: interfaces.Bind) => {

    });
  }

  getContainerModule(): ContainerModule {
    return this.module;
  }
  start(): void {
    throw new Error("Method not implemented.");
  }
}

import Database from "./database/Database";
import fs from 'fs';
import { Container } from "inversify";
import containerModules from "./ioc-modules";

export default class App {
  private database: Database;
  private container: Container;

  constructor() {
    this.database = new Database(process.env.DEBUG_MODE === 'debug');
    this.container = new Container({ skipBaseClassChecks: true });
  }

  /**
   * Starts the aplication
   */
  public async start(): Promise<void> {
    this.loadIocContainers();
    // Connect to the Database
    try {
      // this.database.connect();
    } catch(error) {
      console.error(error);
    }
  }

  private loadIocContainers(): void {
    for(const module of containerModules) {
      module.start(this.container)
    }
  }
}
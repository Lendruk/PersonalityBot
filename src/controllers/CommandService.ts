import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { BotConfig } from "../types/BotConfig";
import { Argument, Command } from "../types/Command";
import StartableService from "../types/StartableService";
import { cleanSpecialCharacters } from "../utils/textUtils";

type FindCommandResult = {
  command?: Command;
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

  public processMessage(message: Message): void {
    let tokens = message.content.trim().replace(/\s\s+/g, ' ').split(' ');
    const commandKey = tokens.splice(0,1)[0];
    // Clean Input
    tokens = tokens.map(token => cleanSpecialCharacters(token));
    const possibleCommands = this.availableCommands.filter(cmd => cmd.key === commandKey); 

    if(possibleCommands.length > 0) {
      const cmdResult = this.findCommand(possibleCommands, tokens);
      if(!cmdResult.command) {
        message.channel.send(this.botConfig.responses.noKnowledge[0]);
      }else {
        message.channel.send(this.executeCommand(cmdResult.command, tokens));
      }
      console.log(tokens);
    } else {
      // message.channel.send(this.botConfig.responses.notFound[0]);
    }
  }

  private findCommand(possibleCommands: Command[], normalizedTokens: string[]): FindCommandResult {
    const cmdResult: FindCommandResult = {};

    for(const token of normalizedTokens) {
      const commandsWithVerb = possibleCommands.filter(cmd => cmd.verbs.map(verb => cleanSpecialCharacters(verb)).includes(token));

      if(commandsWithVerb.length > 0) {
        for(const wordToken of normalizedTokens) {
          const commandsWithWord = possibleCommands.filter(cmd => cmd.actions.find(action => action.word === wordToken));

          if(commandsWithWord.length > 0) {
            cmdResult.command = commandsWithWord[0];
            return cmdResult;
          }
        }
      }
    }

    return cmdResult;
  }

  private executeCommand(command: Command, normalizedTokens: string[]): string {
    const func = require(`../actions/${command.actions[0].script}.js`).default
    let args: { [index: string]: any } = {};

    if(command.actions[0].arguments.length > 0) {
      for(const arg of command.actions[0].arguments) {
        let missingRequiredArg = !arg.optional;
        for(const argWord of arg.words) {
          console.log(argWord);
          const index = normalizedTokens.findIndex(token => token === cleanSpecialCharacters(argWord));

          if(index !== -1) {
            if(arg.type === 'boolean') {
              args[arg.identifier] = true;
            }

            if(index !== normalizedTokens.length -1) {
              if(arg.type === 'string' || arg.type === 'number') {
                const value = normalizedTokens[index+1];
                args[arg.identifier] = value;
              }
            }

            missingRequiredArg = false;
            break;
          }
        }

        if(missingRequiredArg) {
          return this.botConfig.responses.needInfo[0];
        }
      }
    }

    const res = func(args);
    return res;
  }
}
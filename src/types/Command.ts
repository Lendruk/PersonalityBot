import { User } from "discord.js";
import { Action } from "./Action";
import { Mood } from "./Moods";

export type Command = {
  key: string,
  verbs: string[],
  requirements: {
    moods?: Mood[]
  },
  permissions?: any,
  actions: Action[],
};

export type ActiveCommand = {
  user: User,
  command: Command
};

export type Argument = {
  type: 'string' | 'boolean' | 'number';
  identifier: string;
  words: string[];
  optional: boolean;
};
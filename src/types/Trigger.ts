import { Action } from "./Action";

export type Trigger = {
  name: string;
  triggerWords: string[];
  actions: Action[];
};
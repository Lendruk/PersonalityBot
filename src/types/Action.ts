import { Argument } from "./Command";

export enum ActionType {
    PING,
    TEXT_OUTPUT,
    UNKNOWN
}

export type Action = {
    word: string;
    script: string;
    arguments: Argument[];
};
import { Command } from "./Command";
import { Trigger } from "./Trigger";

export type BotConfig = {
    id: string,
    name: string,
    triggers: Trigger[],
    commands: Command[],
    responses: {
        notFound: string[],
        noKnowledge: string[],
        needInfo: string[]
    }
};
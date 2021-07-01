import { Command } from "./Command";

export type BotConfig = {
    id: string,
    name: string,
    commands: Command[],
    responses: {
        notFound: string[],
        noKnowledge: string[],
        needInfo: string[]
    }
};
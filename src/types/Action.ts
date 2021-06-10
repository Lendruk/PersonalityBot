export enum ActionType {
    PING,
    TEXT_OUTPUT,
    UNKNOWN
}
export type Action = {
    type: ActionType,
    params: string | null,
};
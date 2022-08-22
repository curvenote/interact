import { State } from "./types";

export function selectServer(state: State, id: string) {
    return state.thebe.servers?.[id] ?? undefined;
}
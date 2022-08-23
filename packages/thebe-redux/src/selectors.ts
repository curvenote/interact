import type { State } from './reducers';

export function selectServer(state: State, id: string) {
  return state.thebe.servers?.[id] ?? undefined;
}

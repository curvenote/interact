import type { ServerState } from "./servers";

export interface State {
  thebe: {
    servers: ServerState
  };
}

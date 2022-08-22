import { CombinedState } from "@reduxjs/toolkit";
import { State as ThebeState } from "thebe-core";

export interface ConnectState {
  activeServerId?: string;
  activeKernelId?: string;
  activeNotebookId?: string;
  isLive: boolean;
}

export type State = CombinedState<{ connect: ConnectState }> & ThebeState;

import type { CombinedState } from '@reduxjs/toolkit';
import type { State as ThebeState } from 'thebe-redux';

export interface ConnectState {
  activeServerId?: string;
  activeKernelId?: string;
  activeNotebookId?: string;
  isLive: boolean;
}

export type State = CombinedState<{ connect: ConnectState }> & ThebeState;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { SessionStatus } from 'thebe-core';
import { activateReducerCase } from './utils';

export interface SessionInfo {
  id: string;
  serverId: string;
  status: SessionStatus;
  message: string;
  active: boolean;
}

export type ServerState = Record<string, SessionInfo>;

const sessions = createSlice({
  name: 'sessions',
  initialState: {} as ServerState,
  reducers: {
    add: (
      state: ServerState,
      action: PayloadAction<{
        id: string;
        serverId: string;
        status: SessionStatus;
        message: string;
      }>,
    ) => {
      const { id, status, serverId, message } = action.payload;
      if (id in state) return state;
      return {
        ...state,
        [id]: {
          id,
          status,
          serverId: serverId ?? 'unknown',
          message,
          active: false,
        },
      };
    },
    update: (
      state: ServerState,
      action: PayloadAction<{
        id: string;
        status: SessionStatus;
        message: string;
      }>,
    ) => {
      const { id, status, message } = action.payload;
      if (id in state && state[id].status === status && state[id].message === message) return state;
      return {
        ...state,
        [id]: {
          ...state[id],
          id,
          status: status ? status : state[id].status,
          message,
        },
      };
    },
    activate: activateReducerCase,
    remove: (state, action: PayloadAction<{ id: string }>) => {
      // TODO remove should be primarily performed via thunk, so we can use runtime objectsto dispose of resources
      const { id } = action.payload;
      if (id in state) return Object.fromEntries(Object.entries(state).filter(([k]) => k !== id));
      return state;
    },
    clear: () => {
      // TODO clear thunk should also dispose of runtimee objects
      return {};
    },
  },
});

export default sessions;

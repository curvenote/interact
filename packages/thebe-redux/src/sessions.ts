import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { SessionStatus } from 'thebe-core';

export interface SessionInfo {
  id: string;
  status: SessionStatus;
}

export type ServerState = Record<string, SessionInfo>;

const sessions = createSlice({
  name: 'sessions',
  initialState: {} as ServerState,
  reducers: {
    upsert: (state: ServerState, action: PayloadAction<{ id: string; status: SessionStatus }>) => {
      const { id, status } = action.payload;
      if (id in state && state[id].status === status) return state;
      return {
        ...state,
        [id]: {
          id,
          status,
        },
      };
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (id in state)
        return Object.fromEntries(Object.entries(state).filter(([id, obj]) => id !== id));
      return state;
    },
    clear: () => {
      return {};
    },
  },
});

export default sessions;

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ServerStatus } from 'thebe-core';

export interface ServerInfo {
  id: string;
  status: ServerStatus;
}

export type ServerState = Record<string, ServerInfo>;

const servers = createSlice({
  name: 'servers',
  initialState: {} as ServerState,
  reducers: {
    upsert: (state: ServerState, action: PayloadAction<{ id: string; status: ServerStatus }>) => {
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
        return Object.fromEntries(Object.entries(state).filter(([id2]) => id2 !== id));
      return state;
    },
    clear: () => {
      return {};
    },
  },
});

export default servers;

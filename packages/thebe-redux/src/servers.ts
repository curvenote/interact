import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { ServerStatus } from 'thebe-core';
import { activateReducerCase } from './utils';

export interface ServerInfo {
  id: string;
  status: ServerStatus;
  message: string;
  active: boolean;
}

export type ServerState = Record<string, ServerInfo>;

const addUpdate = (
  state: ServerState,
  action: PayloadAction<{ id: string; status: ServerStatus; message: string }>,
) => {
  const { id, status, message } = action.payload;
  if (id in state && state[id].status === status) return state;
  if (id in state) {
    return {
      ...state,
      [id]: {
        ...state[id],
        status: status ? status : state[id].status,
        message,
      },
    };
  }
  return {
    ...state,
    [id]: {
      id,
      status,
      message,
      active: false,
    },
  };
};

const servers = createSlice({
  name: 'servers',
  initialState: {} as ServerState,
  reducers: {
    add: addUpdate,
    update: addUpdate,
    activate: activateReducerCase,
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

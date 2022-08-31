import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { NotebookStatus } from 'thebe-core';
import { activateReducerCase } from './utils';

export interface NotebookInfo {
  id: string;
  name: string;
  path: string;
  status: NotebookStatus;
  active: boolean;
}

export type NotebookState = Record<string, NotebookInfo>;

const notebooks = createSlice({
  name: 'notebooks',
  initialState: {} as NotebookState,
  reducers: {
    add: (
      state: NotebookState,
      action: PayloadAction<{ id: string; name: string; path: string; status: NotebookStatus }>,
    ) => {
      const { id, name, path, status } = action.payload;
      return {
        ...state,
        [id]: { id, name, path, status, active: false },
      };
    },
    remove: (state: NotebookState, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      if (!(id in state)) return state;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: removed, ...newState } = state;
      return newState;
    },
    activate: activateReducerCase,
    clear: () => {
      return {};
    },
  },
});

export default notebooks;

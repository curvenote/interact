import type { PayloadAction } from '@reduxjs/toolkit';
import { CombinedState, createSlice } from '@reduxjs/toolkit';
import type { ConnectState, State } from './types';

const connect = createSlice({
  name: 'connect',
  initialState: {
    isLive: false,
  } as ConnectState,
  reducers: {
    setActiveServerId: (state: ConnectState, action: PayloadAction<string>) => {
      return {
        ...state,
        activeServerId: action.payload,
      };
    },
    setActiveKernelId: (state: ConnectState, action: PayloadAction<string>) => {
      return {
        ...state,
        activeKernelId: action.payload,
      };
    },
    setActiveNotebookId: (state: ConnectState, action: PayloadAction<string>) => {
      return {
        ...state,
        activeNotebookId: action.payload,
      };
    },
    setIsLive: (state: ConnectState, action: PayloadAction<boolean>) => {
      if (state.isLive === action.payload) return state;
      return {
        ...state,
        isLive: action.payload,
      };
    },
  },
});

// https://redux.js.org/usage/deriving-data-selectors#globalize-selectors-if-needed
const getActiveServerId = (state: State) => state.connect.activeServerId;
const getActiveKernelId = (state: State) => state.connect.activeKernelId;
const getActiveNotebookId = (state: State) => state.connect.activeNotebookId;
const getIsLive = (state: State) => state.connect.isLive;

export const selectors = {
  getActiveServerId,
  getActiveKernelId,
  getActiveNotebookId,
  getIsLive,
};

export default connect;

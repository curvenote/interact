import { CombinedState, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConnectState {
  activeServerId?: string;
  activeKernelId?: string;
  activeNotebookId?: string;
  isLive: boolean;
}

const connect = createSlice({
  name: "connect",
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
    setActiveNotebookId: (
      state: ConnectState,
      action: PayloadAction<string>
    ) => {
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

export type RootState = CombinedState<{ connect: ConnectState }>;

// https://redux.js.org/usage/deriving-data-selectors#globalize-selectors-if-needed
const getActiveServerId = (state: RootState) => state.connect.activeServerId;
const getActiveKernelId = (state: RootState) => state.connect.activeKernelId;
const getActiveNotebookId = (state: RootState) =>
  state.connect.activeNotebookId;
const getIsLive = (state: RootState) => state.connect.isLive;

export const selectors = {
  getActiveServerId,
  getActiveKernelId,
  getActiveNotebookId,
  getIsLive,
};

export default connect;

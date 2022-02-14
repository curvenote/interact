import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./setup";

export interface ComputeState {
  activeServerId?: string;
  activeKernelId?: string;
  activeNotebookId?: string;
}

const compute = createSlice({
  name: "compute",
  initialState: {} as ComputeState,
  reducers: {
    setActiveServerId: (state: ComputeState, action: PayloadAction<string>) => {
      return {
        ...state,
        activeServerId: action.payload,
      };
    },
    setActiveKernelId: (state: ComputeState, action: PayloadAction<string>) => {
      return {
        ...state,
        activeKernelId: action.payload,
      };
    },
    setActiveNotebookId: (
      state: ComputeState,
      action: PayloadAction<string>
    ) => {
      return {
        ...state,
        activeNotebookId: action.payload,
      };
    },
  },
});

const getActiveServerId = (state: State) => state.app.compute.activeServerId;
const getActiveKernelId = (state: State) => state.app.compute.activeKernelId;
const getActiveNotebookId = (state: State) =>
  state.app.compute.activeNotebookId;

export const selectors = {
  getActiveServerId,
  getActiveKernelId,
  getActiveNotebookId,
};

export default compute;

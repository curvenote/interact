import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./setup";

export interface ComputeState {
  activeServerId?: string;
  activeKernelId?: string;
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
  },
});

const getActiveServerId = (state: State) => state.app.compute.activeServerId;
const getActiveKernelId = (state: State) => state.app.compute.activeKernelId;

export const selectors = {
  getActiveServerId,
  getActiveKernelId,
};

export default compute;

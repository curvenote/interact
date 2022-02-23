import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./setup";

export interface UIState {
  kernelControls: {
    open: boolean;
  };
}

const ui = createSlice({
  name: "ui",
  initialState: {
    kernelControls: {
      open: false,
    },
  } as UIState,
  reducers: {
    kernelControls: (
      state: UIState,
      action: PayloadAction<{ open: boolean }>
    ) => {
      const { open } = action.payload;
      if (state.kernelControls.open === open) return state;
      return {
        ...state,
        kernelControls: {
          open,
        },
      };
    },
  },
});

export const selectors = {};

export default ui;

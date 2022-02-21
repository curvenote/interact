import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./setup";

export interface UIState {
  kernelControls: {
    open: boolean;
  };
  isLive: boolean;
}

const ui = createSlice({
  name: "ui",
  initialState: {
    kernelControls: {
      open: false,
    },
    isLive: false,
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
    setIsLive: (state: UIState, action: PayloadAction<boolean>) => {
      if (state.isLive === action.payload) return state;
      return {
        ...state,
        isLive: action.payload,
      };
    },
  },
});

const getIsLive = (state: State) => state.app.ui.isLive;

export const selectors = {
  getIsLive,
};

export default ui;

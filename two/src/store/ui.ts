import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      return {
        ...state,
        kernelControls: {
          open,
        },
      };
    },
  },
});

export default ui;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// All Cells are code
export interface CellInfo {
  id: string;
  code: string;
}

export interface NotebookInfo {
  id: string;
  cells: CellInfo[]; // TODO dag should just store cell ids and cells exist in separate subtree
}

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

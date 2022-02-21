import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import Notebook from "thebe-core/dist/notebook";
import compute from "./compute";
import { State } from "./index";
import ui from "./ui";
import { notebookData } from "./notebookData";

export interface CodeBlock {
  id: string;
  source: string;
}

export const fetchNotebook =
  (): ThunkAction<Promise<Notebook>, State, unknown, AnyAction> =>
  async (): Promise<Notebook> => {
    // TODO query api to get notebookData
    // load data into thebe
    return Notebook.fromCodeBlocks(notebookData); // TODO will be a thunk
  };

const actions = { ui: ui.actions, compute: compute.actions };

export default actions;

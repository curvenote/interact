import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import Notebook from "thebe-core/dist/notebook";
import { State } from "./types";

export interface CodeBlock {
  id: string;
  source: string;
}

export const fetchNotebook =
  (
    mockData?: CodeBlock[]
  ): ThunkAction<Promise<Notebook>, State, unknown, AnyAction> =>
  async (): Promise<Notebook> => {
    // TODO query api to get notebookData
    // load data into thebe
    return Notebook.fromCodeBlocks(mockData ?? []); // TODO will be a thunk
  };

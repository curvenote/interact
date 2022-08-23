import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
// TODO export
// import type { CodeBlock } from 'thebe-core';
import { ThebeNotebook } from 'thebe-core';
import type { State } from './types';

export interface CodeBlock {
  id: string;
  source: string;
}

export const fetchNotebook =
  (mockData?: CodeBlock[]): ThunkAction<Promise<ThebeNotebook>, State, unknown, AnyAction> =>
  async (): Promise<ThebeNotebook> => {
    // TODO query api to get notebookData
    // load data into thebe
    return ThebeNotebook.fromCodeBlocks(mockData ?? [], {});
  };

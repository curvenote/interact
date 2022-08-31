import type { AnyAction, ThunkAction } from '@reduxjs/toolkit';
// TODO export
// import type { CodeBlock } from 'thebe-core';
import { ThebeNotebook } from 'thebe-core';
import type { State } from './types';

export interface CodeBlock {
  id: string;
  source: string;
}

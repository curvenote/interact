import type { StateFromReducersMapObject } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import servers from './servers';
import messages from './messages';
import sessions from './sessions';
import notebooks from './notebooks';

const thebeReducerMap = {
  servers: servers.reducer,
  sessions: sessions.reducer,
  messages: messages.reducer,
  notebooks: notebooks.reducer,
};

export const thebeReducer = combineReducers(thebeReducerMap);

const rootReducerMap = {
  thebe: thebeReducer,
};

export const rootReducer = combineReducers(rootReducerMap);

export type State = StateFromReducersMapObject<typeof rootReducerMap>;

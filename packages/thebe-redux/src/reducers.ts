import { combineReducers } from "@reduxjs/toolkit";
import servers from "./servers";
import messages from "./messages";
import sessions from "./sessions";

export const thebeReducer = combineReducers({
  servers: servers.reducer,
  sessions: sessions.reducer,
  messages: messages.reducer
});

export const rootReducer = combineReducers({ thebe: thebeReducer });

export type State = ReturnType<typeof rootReducer>;

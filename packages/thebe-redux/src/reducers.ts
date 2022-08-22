import { combineReducers } from "@reduxjs/toolkit";
import servers from "./servers";

export const thebeReducer = combineReducers({
  servers: servers.reducer,
});

export const rootReducer = combineReducers({ thebe: thebeReducer });

export type State = ReturnType<typeof rootReducer>;

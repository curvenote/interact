import { combineReducers } from "@reduxjs/toolkit";
import { thebeReducer } from "thebe-core";
import ui from "./ui";

export const reducers = combineReducers({
  app: combineReducers({ ui: ui.reducer }),
  thebe: thebeReducer,
});

export type State = ReturnType<typeof reducers>;

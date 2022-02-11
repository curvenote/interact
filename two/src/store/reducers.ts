import { combineReducers } from "@reduxjs/toolkit";
import { thebeReducer } from "thebe-core";
import compute from "./compute";
import ui from "./ui";

export const reducers = combineReducers({
  app: combineReducers({ ui: ui.reducer, compute: compute.reducer }),
  thebe: thebeReducer,
});

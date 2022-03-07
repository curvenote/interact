import { configureStore, Store } from "@reduxjs/toolkit";
import {
  InterpolationInitializer,
  LivePageInvoker,
  logger,
  connect,
} from "common";
import runtime from "@curvenote/runtime";
import { register as basicRegister } from "@curvenote/components";

import { combineReducers } from "@reduxjs/toolkit";
import { thebeReducer } from "thebe-core";
import ui from "./ui";

export const reducers = combineReducers({
  app: combineReducers({ ui: ui.reducer }),
  connect: connect.reducer,
  thebe: thebeReducer,
  runtime: runtime.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger)
      .concat(runtime.triggerEvaluate)
      .concat(runtime.dangerousEvaluatation)
      .concat(InterpolationInitializer)
      .concat(LivePageInvoker),
});

basicRegister(store as any);

declare global {
  interface Window {
    store: Store;
  }
}

window.store = store;

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

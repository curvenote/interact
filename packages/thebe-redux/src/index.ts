import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducers";
import { setupThebeCore } from 'thebe-core';
import { setupContext } from "./context";

export * as selectors from './selectors';
export * as actions from "./actions";
export * from "./reducers";

export function setupStore(preloadedState?: any) {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState
  });
}

export function setupThebeRedux() {
  setupThebeCore();
  setupStore();
  setupContext();
}

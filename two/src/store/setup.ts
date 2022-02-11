import { configureStore, Store } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { logger } from "./middleware";

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

declare global {
  interface Window {
    store: Store;
  }
}

window.store = store;

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

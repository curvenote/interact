import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";

export * from "./reducers";
export { default as actions } from "./actions";

export const store = configureStore({
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;

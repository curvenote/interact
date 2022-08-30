import { configureStore, Store } from '@reduxjs/toolkit';
import runtime from '@curvenote/runtime';
import { register as basicRegister } from '@curvenote/components';

import { combineReducers } from '@reduxjs/toolkit';
import { thebeReducer } from 'thebe-redux';

export const reducers = combineReducers({
  thebe: thebeReducer,
  runtime: runtime.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(runtime.dangerousEvaluatation).concat(runtime.triggerEvaluate),
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

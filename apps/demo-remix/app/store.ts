import type { Store } from '@reduxjs/toolkit';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { thebeReducer } from 'thebe-redux';

const reducers = combineReducers({
  thebe: thebeReducer,
});

export function createStore() {
  return configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
}

const store = createStore();

declare global {
  interface Window {
    gwr: {
      store: Store;
    };
  }
}

window.gwr = {
  ...window.gwr,
  store,
};

export default store;

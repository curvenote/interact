import type { Store } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { setupThebeCore } from 'thebe-core';
import { setupContext } from './context';

export * as selectors from './selectors';
export * as actions from './actions';
export * from './context';
export { State, thebeReducer } from './reducers';
export { ServerInfo } from './servers';

export function setupStore(preloadedState?: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export function setupThebeRedux(opts: { createStore?: boolean } = {}) {
  if (!opts.createStore) setupStore();
  setupThebeCore();
  setupContext();
}

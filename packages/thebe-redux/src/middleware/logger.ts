import type { AnyAction } from '@reduxjs/toolkit';

/**
 * Logs all actions and states after they are dispatched.
 */
export const logger = (store: any) => (next: any) => (action: AnyAction) => {
  console.group(`thebe:redux:action ${action.type}`);
  console.info('thebe:redux:action', action);
  const result = next(action);
  console.debug('thebe:redux next state', store.getState());
  console.groupEnd();
  return result;
};

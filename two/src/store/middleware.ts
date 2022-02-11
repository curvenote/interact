import { AnyAction } from "@reduxjs/toolkit";

/**
 * Logs all actions and states after they are dispatched.
 */
export const logger = (store: any) => (next: any) => (action: AnyAction) => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

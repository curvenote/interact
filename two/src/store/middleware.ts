import { AnyAction } from "@reduxjs/toolkit";
import { getContext, ThebeContext } from "thebe-core";
import { selectors } from "./selectors";
import throttle from "lodash.throttle";

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

const INVOKER_THROTTLE = 300;
function executeFn(ctx: ThebeContext, notebookId: string, kernelId: string) {
  ctx.notebooks[notebookId].executeAll(kernelId, {});
}

const throttledExecFn = throttle(executeFn, INVOKER_THROTTLE);

/**
 * Logs all actions and states after they are dispatched.
 */
export const LivePageInvoker =
  (store: any) => (next: any) => (action: AnyAction) => {
    const result = next(action);
    if (action.type === "COMPONENT_EVENT") {
      console.log("LivePageInvoker:COMPONENT_EVENT");
      const state = store.getState();
      if (
        selectors.ui.getIsLive(state) &&
        selectors.compute.getActiveKernelId(state)
      ) {
        // get active notebook and execute all
        const notebookId = selectors.compute.getActiveNotebookId(state);
        const kernelId = selectors.compute.getActiveKernelId(state);
        const ctx = getContext();
        if (notebookId && kernelId) {
          console.log("Execute!!");
          throttledExecFn(ctx, notebookId, kernelId);
        }
      }
    }

    return result;
  };

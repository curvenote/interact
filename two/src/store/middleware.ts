import { AnyAction } from "@reduxjs/toolkit";
import { getContext } from "thebe-core";
import { selectors } from "./selectors";
import { selectors as thebeSelectors } from "thebe-core";
import runtime from "@curvenote/runtime";
import throttle from "lodash.throttle";
import Interpolator, { ValueMap } from "../Interpolator";

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
function executeFn(
  notebookId: string,
  kernelId: string,
  preprocesor: (s: string) => string
) {
  const ctx = getContext();
  ctx.notebooks[notebookId].executeAll(kernelId, preprocesor);
}

const throttledExecFn = throttle(executeFn, INVOKER_THROTTLE);

const interpolator = new Interpolator();

export const InterpolationInitializer =
  (store: any) => (next: any) => (action: AnyAction) => {
    const result = next(action);
    if (action.type === "compute/setActiveNotebookId") {
      const state = store.getState();
      interpolator.reset();
      const cells = thebeSelectors.notebooks.getCellsForNotebook(
        state,
        action.payload
      );
      interpolator.parseCells(cells);
    }
    return result;
  };

/**
 * Logs all actions and states after they are dispatched.
 */
export const LivePageInvoker =
  (store: any) => (next: any) => (action: AnyAction) => {
    const result = next(action);
    if (action.type === "COMPONENT_EVENT") {
      console.log("LivePageInvoker:COMPONENT_EVENT");
      const state = store.getState();

      // get active notebook and execute all
      const notebookId = selectors.compute.getActiveNotebookId(state);
      const kernelId = selectors.compute.getActiveKernelId(state);

      // TODO better way to access with types
      const values = Object.entries(
        state.runtime.variables as Record<
          string,
          { name: string; current: number | string | boolean }
        >
      ).reduce(
        (V, [key, v]) => ({ ...V, [v.name]: v.current }),
        {} as ValueMap
      );

      console.log("interpolating with values", values);

      if (
        selectors.ui.getIsLive(state) &&
        selectors.compute.getActiveKernelId(state)
      ) {
        if (notebookId && kernelId) {
          console.log("Execute!!");
          throttledExecFn(
            notebookId,
            kernelId,
            interpolator.createPreprocessor(values)
          );
        }
      }
    }

    return result;
  };

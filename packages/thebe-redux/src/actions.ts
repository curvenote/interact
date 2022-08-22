import {
  ThunkAction,
  AnyAction,
  ThunkDispatch
} from "@reduxjs/toolkit";
import servers from "./servers";
import { State } from "./types";
import { Options, ThebeServer, ensureOptions, MessageCallbackArgs, MessageSubject, ServerStatus } from "thebe-core";
import { addObjectToContext } from "./context";

export function clear(): ThunkAction<void, State, unknown, AnyAction> {
    return (dispatch) => {
        dispatch(servers.actions.clear());
    }
}

export function messageDispatch(args: MessageCallbackArgs): ThunkAction<void, State, unknown, AnyAction> {
    return async (dispatch, getState) => {
        const { subject, id, status, message } = args;
        switch(subject) {
            case MessageSubject.server:
                if (id) dispatch(servers.actions.upsert({ id, status: status as ServerStatus }))
            default: {
                console.log(`[${subject}][${status}][${id}] - ${message}`)
            }
        }
    }
}

export function connectMessagesToRedux(dispatch: ThunkDispatch<State, unknown, AnyAction>) {
    return (args: MessageCallbackArgs) => dispatch(messageDispatch(args));
}

export function connectToBinder(opts: Partial<Options>): ThunkAction<void, State, unknown, AnyAction> {
    return async (dispatch, getState) => {
        const options = ensureOptions({
            ...opts,
            useBinder: true,
            useJupyterLite: false
        })
        const server = ThebeServer.connectToServerViaBinder(options, connectMessagesToRedux(dispatch))
        server.then((s) => addObjectToContext(s));
        return server;
    }
}


import type { ThunkAction, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import servers from './servers';
import type { State } from './reducers';
import type { Options, MessageCallbackArgs, ServerStatus } from 'thebe-core';
import { ThebeServer, ensureOptions, MessageSubject } from 'thebe-core';
import { addObjectToContext, getObjectFromContext } from './context';
import messages from './messages';

export const slices = {
  servers: servers.actions,
  sessions: servers.actions,
  messages: messages.actions,
};

export function clear(): ThunkAction<void, State, unknown, AnyAction> {
  return (dispatch) => {
    dispatch(servers.actions.clear());
  };
}

export function messageDispatch(
  args: MessageCallbackArgs,
): ThunkAction<void, State, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const { subject, id, status, message } = args;
    switch (subject) {
      case MessageSubject.server:
        if (id) dispatch(servers.actions.upsert({ id, status: status as ServerStatus }));
    }
    dispatch(messages.actions.add(args));
    console.debug(`[${subject}][${status}][${id}] - ${message}`);
  };
}

export function connectMessagesToRedux(dispatch: ThunkDispatch<State, unknown, AnyAction>) {
  return (args: MessageCallbackArgs) => dispatch(messageDispatch(args));
}

export function connectToBinder(
  opts: Partial<Options>,
): ThunkAction<void, State, unknown, AnyAction> {
  return async (dispatch, getState) => {
    const options = ensureOptions({
      ...opts,
      useBinder: true,
      useJupyterLite: false,
    });
    const server = ThebeServer.connectToServerViaBinder(options, connectMessagesToRedux(dispatch));
    server.then((s) => addObjectToContext(s));
    return server;
  };
}

export function requestSession(
  serverId: string,
  name: string,
  path?: string,
  kernelName?: string,
): ThunkAction<void, State, unknown, AnyAction> {
  return async () => {
    const server = getObjectFromContext<ThebeServer>(serverId);
    if (server && server.isReady()) {
      const session = server.requestKernel({
        name,
        path: path ?? 'notebook.ipynb',
        kernelName: kernelName ?? name,
      });
      session.then((s) => addObjectToContext(s));
      return session;
    }
  };
}

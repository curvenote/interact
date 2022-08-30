import type { ThunkAction, AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import servers from './servers';
import type { State } from './reducers';
import type { CoreOptions, MessageCallbackArgs, KernelOptions } from 'thebe-core';
import { ServerStatus, SessionStatus, ThebeServer, MessageSubject } from 'thebe-core';
import { addObjectToContext, getObjectFromContext } from './context';
import messages from './messages';
import sessions from './sessions';
import { nanoid } from 'nanoid';

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
  return async (dispatch) => {
    const { subject, id, status, message } = args;
    if (id) {
      switch (subject) {
        // TODO handle server disconnects and dead sessions here?
        case MessageSubject.server:
          dispatch(servers.actions.update({ id, status: status as ServerStatus, message }));
          break;
        case MessageSubject.session: {
          dispatch(sessions.actions.update({ id, status: status as SessionStatus, message }));
          break;
        }
      }
    }
    dispatch(messages.actions.add(args));
    console.debug(`[${subject}][${status}][${id}] - ${message}`);
  };
}

export function connectMessagesToRedux(dispatch: ThunkDispatch<State, unknown, AnyAction>) {
  return (args: MessageCallbackArgs) => dispatch(messageDispatch(args));
}

export function connectToBinder(
  opts: CoreOptions & { id?: string },
): ThunkAction<void, State, unknown, AnyAction> {
  return async (dispatch) => {
    // create our own id's
    const id = opts.id ?? nanoid();
    const options = {
      ...opts,
      id,
      useBinder: true,
      useJupyterLite: false,
    };
    dispatch(
      servers.actions.add({ id, status: ServerStatus.launching, message: 'Launching server...' }),
    );
    const server = ThebeServer.connectToServerViaBinder(options, connectMessagesToRedux(dispatch));
    server.then((s) => addObjectToContext(s));
    return server;
  };
}

export function connectToJupyter(
  opts: CoreOptions & { id?: string },
): ThunkAction<void, State, unknown, AnyAction> {
  return async (dispatch) => {
    const id = opts.id ?? nanoid();
    const options = {
      ...opts,
      id,
      useBinder: false,
      useJupyterLite: false,
    };
    dispatch(
      servers.actions.add({
        id,
        status: ServerStatus.launching,
        message: 'Launching server...',
      }),
    );
    const server = ThebeServer.connectToJupyterServer(options, connectMessagesToRedux(dispatch));
    server.then((s) => addObjectToContext(s));
    return server;
  };
}

export function requestSession(
  serverId: string,
  name: string,
  path?: string,
  kernelName?: string,
  externalId?: string,
): ThunkAction<void, State, unknown, AnyAction> {
  return async (dispatch) => {
    const server = getObjectFromContext<ThebeServer>(serverId);
    if (server && server.isReady) {
      const id = externalId ?? nanoid();
      dispatch(
        sessions.actions.add({
          id,
          serverId,
          status: SessionStatus.starting,
          message: 'Starting new session...',
        }),
      );
      const session = server.requestSession({
        id,
        name,
        path: path ?? 'notebook.ipynb',
        kernelName: kernelName ?? name,
      });
      session.then((s) => addObjectToContext(s));
      return session;
    }
  };
}

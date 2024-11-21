import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ServerInfo } from 'thebe-redux';
import { selectors, actions } from 'thebe-redux';
import type { State } from '../redux/types';
import { nanoid } from '@reduxjs/toolkit';

function useBinder(
  start: boolean,
  curvenote: boolean,
  notebookId?: string,
  repo?: string,
  ref?: string,
): {
  requested: boolean;
  serverInfo?: ServerInfo;
} {
  const [serverId, setServerId] = useState<string | undefined>();
  const dispatch = useDispatch();

  const serverInfo = useSelector((state: State) => selectors.selectServer(state, serverId));

  useEffect(() => {
    if (!notebookId || serverId !== undefined || !start) return;
    const id = nanoid();
    setServerId(id);
    dispatch(
      actions.connectToBinder({
        id,
        binderOptions: {
          binderUrl: curvenote ? 'https://binder.curvenote.dev/services/binder/' : undefined,
          repo: ref ?? 'curvenote/binder-base',
          ref: ref ?? 'main',
        },
      }),
    );
  }, [notebookId, serverId, start]);

  return { requested: serverId !== undefined, serverInfo };
}

export function useLocalJupyter(start: boolean, notebookId?: string) {
  const [serverId, setServerId] = useState<string | undefined>();
  const dispatch = useDispatch();

  const serverInfo = useSelector((state: State) => selectors.selectServer(state, serverId));

  useEffect(() => {
    if (!notebookId || serverId !== undefined || !start) return;
    const id = nanoid();
    setServerId(id);
    dispatch(actions.connectToJupyter({ id }));
  }, [notebookId, serverId !== undefined, start]);

  return { requested: serverId !== undefined, serverInfo };
}

export function useJupyterSession(
  start: boolean,
  serverId: string | undefined,
  notebookId?: string,
  kernelName = 'python3',
) {
  const [sessionId, setSessionId] = useState<string | undefined>();
  const dispatch = useDispatch();

  const serverInfo = useSelector((state: State) => selectors.selectServer(state, serverId));
  const sessionInfo = useSelector((state: State) => selectors.selectSession(state, sessionId));
  const isLive = useSelector((state: State) => selectors.selectIsLive(state, serverId, sessionId));

  useEffect(() => {
    if (!serverInfo || sessionId !== undefined || !start) return;
    const id = nanoid();
    setSessionId(id);
    // TODO better session name and path mapping, get info from the notebook instance?
    dispatch(
      actions.requestSession(serverInfo.id, kernelName, `{kernelName}.ipynb`, kernelName, id),
    );
  }, [serverInfo, sessionId, start]);

  return { serverInfo: serverInfo, sessionInfo: sessionInfo, isLive };
}

export default useBinder;

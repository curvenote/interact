import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { ServerInfo } from 'thebe-redux';
import { selectors, actions } from 'thebe-redux';
import type { State } from '../redux/types';
import { connect } from '../redux';
import {
  connectToCurvenoteBinder,
  connectToKernel,
  connectToLocalServer,
  connectToPublicBinder,
} from '../utils';
import { BinderOptions } from 'thebe-core';

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
  const [requested, setRequested] = useState(false);
  const dispatch = useDispatch();

  const serverInfo = useSelector(selectors.selectActiveServer);

  useEffect(() => {
    if (!notebookId || requested || !start) return;
    setRequested(true);

    if (curvenote) {
      dispatch(
        actions.connectToBinder({
          binderOptions: {
            binderUrl: 'https://binder.curvenote.dev/services/binder/',
            repo: ref ?? 'curvenote/binder-base',
            ref: ref ?? 'main',
          } as BinderOptions, // TODO fix options in thebe-core
        }),
      );
    } else {
      dispatch(actions.connectToBinder({}));
    }

    // const p = curvenote
    //   ? connectToCurvenoteBinder(repo, branch)
    //   : connectToPublicBinder(repo, branch);
    // p.then((server) => {
    //   // dispatch(connect.actions.setActiveServerId(server.id));
    // });
  }, [notebookId, requested, start]);

  return { requested, serverInfo };
}

export function useLocalJupyter(start: boolean, notebookId?: string) {
  const [requested, setRequested] = useState(false);
  const dispatch = useDispatch();

  const serverInfo = useSelector(selectors.selectActiveServer);

  useEffect(() => {
    if (!notebookId || requested || !start) return;
    setRequested(true);

    dispatch(actions.connectToJupyter({}));
  }, [notebookId, requested, start]);

  return { requested, serverInfo };
}

export function useJupyterSession(
  start: boolean,
  notebookId?: string,
  activeServerId?: string,
  kernelName = 'python3',
) {
  const dispatch = useDispatch();

  const activeServerInfo = useSelector(selectors.selectActiveServer);
  const activeSessionInfo = useSelector((state: State) =>
    selectors.selectActiveSessionForServer(state, activeServerInfo?.id),
  );
  const isLive = useSelector(selectors.selectIsLive);

  useEffect(() => {
    if (!activeServerInfo || !start) return;
    // TODO better session name and path mapping, get info from the notebook instance?
    dispatch(
      actions.requestSession(activeServerInfo.id, kernelName, `{kernelName}.ipynb`, kernelName),
    );
  }, [activeServerId, start]);

  return { serverInfo: activeServerInfo, sessionInfo: activeSessionInfo, isLive };
}

export default useBinder;

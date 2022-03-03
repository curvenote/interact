import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContext, actions as thebeActions } from "thebe-core";
import { ServerInfo, KernelStatus } from "thebe-core";
import { State } from "../../store";
import { selectors, connect } from "../redux";
import {
  connectToKernel,
  connectToLocalServer,
  connectToPublicBinder,
} from "../utils";

function usePublicBinder(
  start: boolean,
  notebookId?: string
): {
  requested: boolean;
  serverInfo?: ServerInfo;
} {
  const [requested, setRequested] = useState(false);
  const dispatch = useDispatch();

  const activeServerId = useSelector(selectors.getActiveServerId);

  const serverInfo = useSelector((state: State) => {
    if (!activeServerId) return;
    return state.thebe.servers[activeServerId];
  });

  useEffect(() => {
    if (!notebookId || requested || !start) return;
    setRequested(true);
    connectToPublicBinder().then((server) => {
      dispatch(connect.actions.setActiveServerId(server.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebookId, requested, start]);

  return { requested, serverInfo };
}

export function useLocalJupyter(start: boolean, notebookId?: string) {
  const [requested, setRequested] = useState(false);
  const dispatch = useDispatch();

  const activeServerId = useSelector(selectors.getActiveServerId);

  const serverInfo = useSelector((state: State) => {
    if (!activeServerId) return;
    return state.thebe.servers[activeServerId];
  });

  useEffect(() => {
    if (!notebookId || requested || !start) return;
    setRequested(true);
    connectToLocalServer().then((server) => {
      dispatch(connect.actions.setActiveServerId(server.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebookId, requested, start]);

  return { requested, serverInfo };
}

export function useJupyterKernel(
  start: boolean,
  notebookId?: string,
  activeServerId?: string,
  kernelName = "python3"
) {
  const dispatch = useDispatch();

  const activeKernelId = useSelector(selectors.getActiveKernelId);
  const isLive = useSelector(selectors.getIsLive);
  // TODO selector - get active selector
  const kernelInfo = useSelector((state: State) => {
    if (!activeKernelId) return;
    return state.thebe.kernels[activeKernelId] ?? {};
  });

  useEffect(() => {
    if (!activeServerId || !start) return;
    connectToKernel(activeServerId, kernelName).then((kernel) => {
      dispatch(connect.actions.setActiveKernelId(kernel.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeServerId, start]);

  useEffect(() => {
    if (
      !notebookId ||
      !activeKernelId ||
      kernelInfo?.status !== KernelStatus.ready ||
      isLive
    )
      return;

    dispatch(
      thebeActions.thunks.notebooks.attachKernel(notebookId, activeKernelId)
    );
    dispatch(
      thebeActions.thunks.notebooks.executeAll(notebookId, activeKernelId)
    );
    dispatch(connect.actions.setIsLive(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebookId, activeKernelId, kernelInfo?.status]);

  return { kernelInfo, isLive };
}

export default usePublicBinder;

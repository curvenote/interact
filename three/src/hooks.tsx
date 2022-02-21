import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContext } from "thebe-core";
import { KernelInfo, KernelStatus } from "thebe-core";
import { ServerInfo, ServerStatus } from "thebe-core";
import { actions, selectors, State } from "./store";
import {
  connectToKernel,
  connectToLocalServer,
  connectToPublicBinder,
} from "./utils";

function usePublicBinder(
  connect: boolean,
  notebookId?: string
): {
  requested: boolean;
  serverInfo?: ServerInfo;
} {
  const [requested, setRequested] = useState(false);
  const dispatch = useDispatch();

  const activeServerId = useSelector(selectors.compute.getActiveServerId);

  const serverInfo = useSelector((state: State) => {
    if (!activeServerId) return;
    return state.thebe.servers[activeServerId];
  });

  useEffect(() => {
    if (!notebookId || requested || !connect) return;
    setRequested(true);
    connectToPublicBinder().then((server) => {
      dispatch(actions.compute.setActiveServerId(server.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebookId, requested, connect]);

  return { requested, serverInfo };
}

export function useLocalJupyter(connect: boolean, notebookId?: string) {
  const [requested, setRequested] = useState(false);
  const dispatch = useDispatch();

  const activeServerId = useSelector(selectors.compute.getActiveServerId);

  const serverInfo = useSelector((state: State) => {
    if (!activeServerId) return;
    return state.thebe.servers[activeServerId];
  });

  useEffect(() => {
    if (!notebookId || requested || !connect) return;
    setRequested(true);
    connectToLocalServer().then((server) => {
      dispatch(actions.compute.setActiveServerId(server.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebookId, requested, connect]);

  return { requested, serverInfo };
}

export function useJupyterKernel(
  connect: boolean,
  notebookId?: string,
  activeServerId?: string,
  kernelName = "python3"
) {
  const dispatch = useDispatch();

  const activeKernelId = useSelector(selectors.compute.getActiveKernelId);
  const isLive = useSelector(selectors.ui.getIsLive);
  const kernelInfo = useSelector((state: State) => {
    if (!activeKernelId) return;
    return state.thebe.kernels[activeKernelId] ?? {};
  });

  useEffect(() => {
    if (!activeServerId || !connect) return;
    connectToKernel(activeServerId, kernelName).then((kernel) => {
      dispatch(actions.compute.setActiveKernelId(kernel.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeServerId, connect]);

  useEffect(() => {
    if (
      !notebookId ||
      !activeKernelId ||
      kernelInfo?.status !== KernelStatus.ready ||
      isLive
    )
      return;
    const ctx = getContext();
    ctx.notebooks[notebookId]?.executeAll(activeKernelId);
    dispatch(actions.ui.setIsLive(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebookId, activeKernelId, kernelInfo?.status]);

  return { kernelInfo, isLive };
}

export default usePublicBinder;

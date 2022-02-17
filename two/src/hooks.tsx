import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContext } from "thebe-core";
import { KernelInfo, KernelStatus } from "thebe-core";
import { ServerInfo, ServerStatus } from "thebe-core";
import { actions, selectors, State } from "./store";
import { connectToKernel, connectToPublicBinder } from "./utils";

function usePublicBinder(
  connect: boolean,
  notebookId?: string,
  kernelName = "python3"
): {
  requested: boolean;
  serverInfo?: ServerInfo;
  kernelInfo?: KernelInfo;
  isLive: boolean;
} {
  const [requested, setRequested] = useState(false);
  const dispatch = useDispatch();

  const activeServerId = useSelector(selectors.compute.getActiveServerId);

  const serverInfo = useSelector((state: State) => {
    if (!activeServerId) return;
    return state.thebe.servers[activeServerId];
  });
  const isLive = useSelector(selectors.ui.getIsLive);

  useEffect(() => {
    if (!notebookId || requested || !connect) return;
    setRequested(true);
    connectToPublicBinder().then((server) => {
      dispatch(actions.compute.setActiveServerId(server.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebookId, requested, connect]);

  const activeKernelId = useSelector(selectors.compute.getActiveKernelId);
  const kernelInfo = useSelector((state: State) => {
    if (!activeKernelId) return;
    return state.thebe.kernels[activeKernelId] ?? {};
  });

  useEffect(() => {
    if (!activeServerId || serverInfo?.status !== ServerStatus.ready) return;
    connectToKernel(activeServerId, kernelName).then((kernel) => {
      dispatch(actions.compute.setActiveKernelId(kernel.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeServerId, serverInfo?.status]);

  useEffect(() => {
    if (
      !notebookId ||
      !activeKernelId ||
      kernelInfo?.status !== KernelStatus.ready
    )
      return;
    const ctx = getContext();
    ctx.notebooks[notebookId]?.executeAll(activeKernelId);
    dispatch(actions.ui.setIsLive(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notebookId, activeKernelId, kernelInfo?.status]);

  return { requested, serverInfo, kernelInfo, isLive };
}

export default usePublicBinder;

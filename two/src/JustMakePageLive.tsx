import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  getContext,
  Server,
  ThebeKernel,
  selectors as thebeSelectors,
} from "thebe-core";
import { KernelStatus } from "thebe-core/dist/store/kernels";
import { ServerStatus } from "thebe-core/dist/store/servers";
import { actions, selectors, State } from "./store";
import { FiPower } from "react-icons/fi";
import {
  connectToKernel,
  connectToLocalServer,
  connectToPublicBinder,
} from "./utils";
import classNames from "classnames";

function JustMakePageLive({ notebookId }: { notebookId?: string }) {
  const dispatch = useDispatch();

  const [requested, setRequested] = useState(false);

  const kernelName = "python3";
  const activeServerId = useSelector(selectors.compute.getActiveServerId);
  const activeKernelId = useSelector(selectors.compute.getActiveKernelId);
  const serverInfo = useSelector((state: State) => {
    if (!activeServerId) return;
    return state.thebe.servers[activeServerId];
  });
  const isLive = useSelector(selectors.ui.getIsLive);

  const kernelInfo = useSelector((state: State) => {
    if (!activeKernelId) return;
    return state.thebe.kernels[activeKernelId] ?? {};
  });

  // TODO usePublicBinder hook
  const clickMakeLive = async () => {
    if (!notebookId || requested) return;
    setRequested(true);
    const server = await connectToPublicBinder();
    // const server = await connectToLocalServer();
    dispatch(actions.compute.setActiveServerId(server.id));
  };

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

  let message = "Click to connect to a server/kernel and make the page live";
  if (serverInfo && serverInfo?.status !== ServerStatus.ready)
    message = serverInfo?.message;
  else if (kernelInfo && kernelInfo.status !== KernelStatus.ready)
    message = `Connecting to kernel: ${kernelName}`;
  // TODO errors!
  else if (isLive) message = `Connected to kernel: ${kernelName}`;

  return (
    <div className="just-make-live">
      <button
        className={classNames("just-make-live-button", {
          "just-make-live-requested": requested && !isLive,
          "just-make-live-connected": isLive,
        })}
        disabled={requested}
        onClick={clickMakeLive}
      >
        <FiPower />
      </button>
      <div className="just-make-live-panel">{message}</div>
    </div>
  );
}

export default JustMakePageLive;

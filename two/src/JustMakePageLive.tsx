import React, { useState } from "react";
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

  const clickMakeLive = async () => {
    if (!notebookId || requested) return;
    setRequested(true);
    const server = await connectToPublicBinder();
    dispatch(actions.compute.setActiveServerId(server.id));
    // await connectToLocalServer();

    const kernel = await connectToKernel(server.id, kernelName);
    dispatch(actions.compute.setActiveKernelId(kernel.id));

    const ctx = getContext();
    await ctx.notebooks[notebookId]?.executeAll(kernel.id);

    dispatch(actions.ui.setIsLive(true));
  };

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

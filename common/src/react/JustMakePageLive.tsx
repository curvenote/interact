import React, { useState } from "react";
import { KernelStatus } from "thebe-core/dist/store/kernels";
import { ServerStatus } from "thebe-core/dist/store/servers";
import { FiPower } from "react-icons/fi";
import classNames from "classnames";
import usePublicBinder, { useJupyterKernel, useLocalJupyter } from "./hooks";

function JustMakePageLive({
  notebookId,
  local = false,
}: {
  notebookId?: string;
  local?: boolean;
}) {
  const [connect, setConnect] = useState(false);

  const kernelName = "python3";

  const { requested: binderRequested, serverInfo: binderServerInfo } =
    usePublicBinder(connect && !local, notebookId);
  const { requested: localRequested, serverInfo: localServerInfo } =
    useLocalJupyter(connect && local, notebookId);

  const requested = binderRequested || localRequested;
  const serverInfo = binderServerInfo ?? localServerInfo;

  const { kernelInfo, isLive } = useJupyterKernel(
    serverInfo?.status === ServerStatus.ready,
    notebookId,
    serverInfo?.id,
    kernelName
  );

  const clickMakeLive = () => {
    if (!notebookId || connect) return;
    setConnect(true);
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

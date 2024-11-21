import React, { useState } from 'react';
import { FiPower } from 'react-icons/fi';
import classNames from 'classnames';
import useBinder, { useJupyterSession, useLocalJupyter } from './hooks';
import { ServerStatus, SessionStatus } from 'thebe-core';

function MakePageLive({
  notebookId,
  curvenote = false,
  local = false,
  repo,
  branch,
}: {
  notebookId?: string;
  curvenote?: boolean;
  local?: boolean;
  repo?: string;
  branch?: string;
}) {
  const [connect, setConnect] = useState(false);

  const kernelName = 'python3';

  const { requested: binderRequested, serverInfo: binderServerInfo } = useBinder(
    connect && !local,
    curvenote,
    notebookId,
    repo,
    branch,
  );

  const { requested: localRequested, serverInfo: localServerInfo } = useLocalJupyter(
    connect && local,
    notebookId,
  );

  const requested = binderRequested || localRequested;
  const serverInfo = binderServerInfo ?? localServerInfo;

  const { sessionInfo, isLive } = useJupyterSession(
    (serverInfo?.status ?? false) && serverInfo?.status === ServerStatus.ready,
    serverInfo?.id,
    notebookId,
    kernelName,
  );

  const clickMakeLive = () => {
    if (!notebookId || connect) return;
    setConnect(true);
  };

  console.log(isLive);

  let message = 'Click to connect to a server/kernel and make the page live';

  if (isLive) message = `Connected to kernel: ${kernelName}`;
  else if (sessionInfo && sessionInfo.status !== SessionStatus.ready)
    message = `Starting session and connecting to kernel: ${kernelName}`;
  else if (
    (serverInfo && serverInfo?.status !== ServerStatus.ready && serverInfo?.message) ||
    (serverInfo && serverInfo?.status === ServerStatus.ready && !sessionInfo)
  )
    message = serverInfo?.message;
  else if (connect) message = 'Connecting...';

  return (
    <div className="just-make-live">
      <button
        className={classNames('just-make-live-button', {
          'just-make-live-requested': requested && !isLive,
          'just-make-live-connected': isLive,
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

export default MakePageLive;

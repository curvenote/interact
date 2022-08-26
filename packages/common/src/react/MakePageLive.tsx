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

  // const localRequested = false;
  // const localServerInfo = { id: 'unknown', status: undefined, message: '' };

  const requested = binderRequested || localRequested;
  const serverInfo = binderServerInfo ?? localServerInfo;

  const { sessionInfo, isLive } = useJupyterSession(
    (serverInfo?.status ?? false) && serverInfo?.status === ServerStatus.ready,
    notebookId,
    serverInfo?.id,
    kernelName,
  );

  const clickMakeLive = () => {
    if (!notebookId || connect) return;
    setConnect(true);
  };

  let message = 'Click to connect to a server/kernel and make the page live';
  if (serverInfo && serverInfo?.status !== ServerStatus.ready && serverInfo?.message) {
    console.log({ message });
    message = serverInfo?.message;
  } else if (sessionInfo && sessionInfo.status !== SessionStatus.ready)
    message = `Connecting to kernel: ${kernelName}`;
  // TODO errors!
  else if (isLive) message = `Connected to kernel: ${kernelName}`;
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Server } from "thebe-core";
import { ServerStatus } from "thebe-core/dist/store/servers";
import { actions, State } from "./store";

const BINDER_INFO = {
  repo: "binder-examples/requirements",
  ref: "master",
};

function KernelPanel() {
  const [serverId, setServerId] = useState<string | null>(null);
  const [kernelNames, setKernelNames] = useState<string[]>([]);
  const [defaultKernel, setDefaultKernel] = useState<string>("");

  const clickConnect = async () => {
    // TODO action - connectToBinder
    // TODO pass the info in
    // TODO get a serverId back
    // TODO create kernel and attach to server
    const server = await Server.connectToServerViaBinder(
      window.thebe_core,
      BINDER_INFO
    );
    setServerId(server.id);
  };

  const serverInfo = useSelector((state: State) => {
    if (serverId === null) return;
    return state.thebe.servers[serverId] ?? {};
  });

  const serverReady = serverInfo?.status === ServerStatus.ready;
  useEffect(() => {
    if (serverId == null) return;
    const server = new Server(window.thebe_core, serverId);
    server.fetchKernelNames().then((response) => {
      setDefaultKernel(response.default);
      setKernelNames(response.names);
    });
  }, [serverId, serverReady]);

  const kernelButtons = kernelNames.map((name) => {
    return (
      <button key={name} title="click to connect">
        {name === defaultKernel ? `${name}*` : name}
      </button>
    );
  });

  return (
    <div className="kernel-panel">
      <div>Servers:</div>
      <div>
        <button onClick={clickConnect} disabled={!!serverInfo}>
          connect to binder
        </button>
        {serverInfo?.status && (
          <div>
            <div>Status: {serverInfo?.status}</div>
            <div>{serverInfo?.message}</div>
          </div>
        )}
      </div>
      {kernelNames.length > 0 && (
        <div>
          <div>Available Kernels:</div>
          <div>{kernelButtons}</div>
        </div>
      )}
    </div>
  );
}

function KernelControl() {
  const dispatch = useDispatch();
  const openPanel = useSelector(
    (state: State) => state.app.ui.kernelControls.open
  );

  return (
    <div className="kernel-control">
      <button
        onClick={() =>
          dispatch(actions.ui.kernelControls({ open: !openPanel }))
        }
      >
        (s)
      </button>
      {openPanel && <KernelPanel />}
    </div>
  );
}

export default KernelControl;

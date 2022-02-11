import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
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

function KernelPanel() {
  const dispatch = useDispatch();

  const activeServerId = useSelector(selectors.compute.getActiveServerId);
  const activeKernelId = useSelector(selectors.compute.getActiveKernelId);

  const clickConnectBinder = async () => {
    const server = await Server.connectToServerViaBinder({
      repo: "binder-examples/requirements",
      ref: "master",
    });
    dispatch(actions.compute.setActiveServerId(server.id));
  };

  const clickConnectKernel = async (name: string) => {
    if (activeServerId == null) return;
    const kernel = new ThebeKernel(nanoid(), activeServerId);
    const server = new Server(getContext(), activeServerId);
    kernel.request(server, name);
    dispatch(actions.compute.setActiveKernelId(kernel.id));
  };

  const defaultKernelName = useSelector((state: State) =>
    thebeSelectors.servers.getDefaultKernelName(state, activeServerId ?? "")
  );

  const kernelNames = useSelector((state: State) =>
    thebeSelectors.servers.getKernelNames(state, activeServerId ?? "")
  );

  const serverInfo = useSelector((state: State) => {
    if (!activeServerId) return;
    return state.thebe.servers[activeServerId];
  });

  const kernelInfo = useSelector((state: State) => {
    if (!activeKernelId) return;
    return state.thebe.kernels[activeKernelId] ?? {};
  });

  const serverReady = serverInfo?.status === ServerStatus.ready;
  useEffect(() => {
    if (activeServerId == null) return;
    Server.fetchKernelNames(activeServerId);
  }, [activeServerId, serverReady]);

  const kernelButtons = kernelNames.map((name: string) => {
    return (
      <button
        key={name}
        title="click to connect"
        onClick={() => clickConnectKernel(name)}
        disabled={!!activeKernelId}
      >
        {name === defaultKernelName ? `${name}*` : name}
      </button>
    );
  });

  const kernelStatusColor =
    kernelInfo?.status === KernelStatus.ready ? "green" : "orange";

  return (
    <div className="kernel-panel">
      <div>Servers:</div>
      <div>
        <button onClick={clickConnectBinder} disabled={!!serverInfo}>
          connect to binder
        </button>
        {serverInfo?.status && (
          <div style={{ fontSize: "80%" }}>
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
      {kernelInfo?.status && (
        <div>
          <div style={{ color: kernelStatusColor }}>
            Status: {kernelInfo?.status}
          </div>
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
        {">o<"}
      </button>
      {openPanel && <KernelPanel />}
    </div>
  );
}

export default KernelControl;

import { nanoid } from "@reduxjs/toolkit";
import {
  getContext,
  Server,
  ThebeKernel,
  selectors as thebeSelectors,
} from "thebe-core";
import { KernelStatus } from "thebe-core/dist/store/kernels";
import { ServerStatus } from "thebe-core/dist/store/servers";
import { actions, selectors, State } from "./store";

export async function connectToPublicBinder() {
  return Server.connectToServerViaBinder({
    repo: "binder-examples/requirements",
    ref: "master",
  });
}

export async function connectToLocalServer() {
  return Server.connectToServer({
    appendToken: true,
    baseUrl: "http://localhost:8888",
    token: "test-secret",
  });
}

export async function connectToKernel(serverId: string, name: string) {
  const kernel = new ThebeKernel(nanoid(), serverId);
  const server = new Server(getContext(), serverId);
  return kernel.request(server, name);
}

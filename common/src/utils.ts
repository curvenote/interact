import { nanoid } from "@reduxjs/toolkit";
import { getContext, Server, ThebeKernel } from "thebe-core";

export async function connectToPublicBinder(
  repo: string = "binder-examples/requirements",
  ref: string = "master"
) {
  return Server.connectToServerViaBinder({ repo, ref });
}

export async function connectToCurvenoteBinder(
  repo: string = "curvenote/binder-base",
  ref: string = "main"
) {
  return Server.connectToServerViaBinder({
    binderUrl: "https://binder.curvenote.dev/services/binder/",
    repo,
    ref,
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

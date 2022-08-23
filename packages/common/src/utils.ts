import { nanoid } from '@reduxjs/toolkit';
import { getContext, getObjectFromContext } from 'thebe-redux';
import { ThebeServer, ThebeSession } from 'thebe-core';

export async function connectToPublicBinder(repo = 'binder-examples/requirements', ref = 'master') {
  throw Error('Deprecated - do not use');
  // return ThebeServer.connectToServerViaBinder({ repo, ref });
}

export async function connectToCurvenoteBinder(repo = 'curvenote/binder-base', ref = 'main') {
  throw Error('Deprecated - do not use');
  // return ThebeServer.connectToServerViaBinder({
  //   binderOptions: {
  //     binderUrl: 'https://binder.curvenote.dev/services/binder/',
  //     repo,
  //     ref,
  //   },
  // });
}

export async function connectToLocalServer() {
  throw Error('Deprecated - do not use');
  // return ThebeServer.connectToServer({
  //   appendToken: true,
  //   baseUrl: 'http://localhost:8888',
  //   token: 'test-secret',
  // });
}

export async function connectToKernel(serverId: string, name: string) {
  throw Error('Deprecated - do not use');
  // const kernel = new ThebeSession(nanoid(), serverId);
  // const server = getObjectFromContext<ThebeServer>(serverId);
  // return kernel.request(server, name);
}

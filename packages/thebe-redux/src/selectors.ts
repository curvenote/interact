import { createSelector } from '@reduxjs/toolkit';
import { ServerStatus, SessionStatus } from 'thebe-core';
import type { State } from './reducers';
import type { ServerInfo } from './servers';
import type { SessionInfo } from './sessions';

export function selectServer(state: State, id: string | undefined) {
  if (!id) return undefined;
  return state.thebe.servers?.[id] ?? undefined;
}

export function selectActiveServer(state: State) {
  return Object.values(state.thebe.servers).find((item) => item.active);
}

export function selectSession(state: State, id: string | undefined) {
  if (!id) return undefined;
  return state.thebe.sessions?.[id] ?? undefined;
}

export function selectActiveSession(state: State) {
  return Object.values(state.thebe.sessions).find((item) => item.active);
}

export function selectSessionsForServer(state: State, id: string | undefined) {
  if (!id) return undefined;
  return Object.values(state.thebe.sessions).filter((item) => item.serverId === id);
}

export function selectActiveSessionForServer(state: State, serverId: string | undefined) {
  return Object.values(state.thebe.sessions)
    .filter((item) => !serverId || item.serverId === serverId)
    .find((item) => item.active);
}

function isLive(server: ServerInfo | undefined, session: SessionInfo | undefined) {
  return (
    Boolean(server) &&
    server?.status === ServerStatus.ready &&
    Boolean(session) &&
    session?.status === SessionStatus.ready &&
    server.id === session.serverId
  );
}

export const selectIsLive = createSelector(
  [
    (state: State, serverId: string | undefined) => selectServer(state, serverId),
    (state: State, serverId: string | undefined, sessionId: string | undefined) =>
      selectSession(state, sessionId),
  ],
  isLive,
);

export const selectActiveIsLive = createSelector([selectActiveServer, selectActiveSession], isLive);

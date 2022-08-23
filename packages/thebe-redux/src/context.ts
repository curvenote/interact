import type { ThebeServer, ThebeSession } from 'thebe-core';

export type ContextObject = ThebeServer | ThebeSession;

interface ContextItem {
  id: string;
  obj: ContextObject;
}

export class Context {
  objects: { id: string; obj: ContextObject }[];

  constructor() {
    this.objects = [];
  }

  set(id: string, obj: ContextObject) {
    this.objects.push({ id, obj });
  }

  get(id: string) {
    return this.objects.find((item: ContextItem) => item.id === id);
  }
}

let context: Context | undefined;

export function setupContext() {
  context = new Context();
}

export function getContext() {
  if (!context) throw Error('Context is not initialized, call setupContext');
  return context;
}

export function addObjectToContext(obj: ContextObject) {
  context?.set(obj.id, obj);
}

export function getObjectFromContext<T>(id: string) {
  return context?.get(id)?.obj as T | undefined;
}

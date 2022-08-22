import {ThebeServer} from 'thebe-core';

export type ContextObject = ThebeServer;

interface ContextItem {
    id: string;
    obj: ContextObject;
}

export class Context {

    objects: { id: string, obj: ContextObject }[];

    constructor() {
        this.objects = [];
    }

    set(id: string, obj: ContextObject) {
        this.objects.push({id, obj})
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
    return context;
}

export function addObjectToContext(obj: ContextObject) {
    context?.set(obj.id, obj)
}

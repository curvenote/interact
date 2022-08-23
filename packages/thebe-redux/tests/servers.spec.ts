import {setupStore} from '../src/index'
import {selectors} from '../src'
import servers from '../src/servers'
import {ServerStatus} from 'thebe-core'

jest.mock('thebe-core')

describe('servers', () => {
    test('initial servers state is empty', () => {
        const store = setupStore();
        expect(store?.getState()).toEqual({ thebe: { servers: {} }})
    })
    test('select non-existent server', () => {
        const store = setupStore();
        expect(selectors.selectServer(store.getState(), "not-there")).toBeUndefined()
    })
    test('add a server', () => {
        const store = setupStore();
        store?.dispatch(servers.actions.upsert({ id: "abc123", status: ServerStatus.launching }))
        expect(selectors.selectServer(store.getState(), "abc123")).toEqual({
            id: 'abc123',
            status: ServerStatus.launching
        })
    });
    test('remove a server', () => {
        const store = setupStore({ thebe: { servers: {
            "abc": { id: "abc", status: ServerStatus.ready }
        }}});
        store?.dispatch(servers.actions.remove({ id: "abc123" }))
        expect(selectors.selectServer(store.getState(), "abc123")).toBeUndefined()
    });
    test('clear', () => {
        const store = setupStore({ thebe: { servers: {
            "abc": { id: "abc", status: ServerStatus.ready }
        }}});
        store?.dispatch(servers.actions.clear())
        expect(selectors.selectServer(store.getState(), "abc123")).toBeUndefined()
    })
})
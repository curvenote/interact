import { setupStore } from '../src/index'

let store: ReturnType<typeof setupStore> | undefined;

describe('store', () => {
    beforeAll(() => {
        store = setupStore();
    })
    test('store available', () => {
        expect(store).toBeDefined()
    })
})
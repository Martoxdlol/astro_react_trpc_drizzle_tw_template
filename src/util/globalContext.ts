import type { AstroGlobal } from "astro";




// Can share data on a same request on server side rendering
export class RequestStore {
    private static store = new WeakMap<AstroGlobal['request'], RequestStore>();

    private map = new Map<string, any>();


    static of(request: AstroGlobal['request']) {
        const store = RequestStore.store.get(request);
        if (store) {
            return store;
        }
        const newStore = new RequestStore();
        RequestStore.store.set(request, newStore);
        return newStore;
    }

    public get<T>(key: string) {
        return this.map.get(key) as T;
    }

    public set(key: string, value: any) {
        this.map.set(key, value);
    }
}

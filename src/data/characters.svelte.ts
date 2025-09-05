import { createResource } from "./resource.svelte.ts";
import type { Character } from "./schema.js";

export const characters = createResource<Character>({
    getRecords: () => {
        throw Error("NotImplemented");
    },
    setRecords: (records) => {
        throw Error("NotImplemented");
    },
});

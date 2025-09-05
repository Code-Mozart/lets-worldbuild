import { database } from "./database.svelte.js";
import { createResource } from "./resource.svelte.ts";
import type { Project } from "./schema.js";

export const projects = createResource<Project>({
    getRecords: () => database.projects,
    setRecords: (records) => {
        database.projects = records;
    },
});

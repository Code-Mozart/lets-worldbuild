import { init } from "@paralleldrive/cuid2";
import { t } from "../lib/i18n.svelte";
import { makeDAO } from "./dao";
import type { Project, Records } from "./schema";

const localStorageKey = "lets-worldbuild/v1";

export const cuid = init({ length: 8 });

export interface Database {
    projects: Records<Project>;
}

export const createInitialProject = () => {
    const now = new Date();
    return {
        id: cuid(),
        createdAt: now,
        updatedAt: now,
        name: t("gettingStarted.firstProjectName"),
        characters: {},
    };
};

export const createEmptyDatabase = () => {
    return { projects: {} };
};

export const createInitialDatabase = () => {
    const project = createInitialProject();
    return {
        projects: {
            [project.id]: project,
        },
    };
};

export const loadLocalStorage = (
    fallback = createInitialDatabase,
) => {
    const raw = localStorage.getItem(localStorageKey);
    if (raw === null) return fallback();
    return JSON.parse(raw) as Database;
};

class DatabaseInitiator {
    database: Database;

    constructor() {
        this.database = $state(loadLocalStorage());
        $effect.root(() => {
            $effect(() => {
                const current = loadLocalStorage(createEmptyDatabase);
                this.database = { ...current, ...this.database };
                localStorage.setItem(
                    localStorageKey,
                    JSON.stringify(this.database),
                );
            });
            return () => {};
        });
    }

    get dataAccessor() {
        return makeDAO(this.database);
    }
}

export const database = new DatabaseInitiator().dataAccessor;

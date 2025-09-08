import { t } from "../lib/i18n.svelte";
import { cuid } from "./cuid";
import { makeDAO } from "./dao";
import { projectShape } from "./schema";

const localStorageKey = "lets-worldbuild/v1";

export const databaseShape = {
    projects: projectShape,
};

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
    return JSON.parse(raw);
};

class DatabaseInitiator {
    database;

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
        });
    }

    get dataAccessor() {
        return makeDAO(this.database, databaseShape);
    }
}

export const database = new DatabaseInitiator().dataAccessor;

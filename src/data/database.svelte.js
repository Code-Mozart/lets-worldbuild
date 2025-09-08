import { t } from "../lib/i18n.svelte";
import { cuid } from "./cuid";

const localStorageKey = "lets-worldbuild/v1";

const createNewID = (existing) => {
    const maxAttempts = 5;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const id = cuid();
        if (!(id in existing)) return id;
        console.warn(
            `ID '${id}' collided with existing ids. This should most likely never happen!`,
        );
    }
    throw new Error(
        `Could not create a new unique ID in ${maxAttempts} attempts`,
    );
};

export const recordProperties = ["id", "createdAt", "updatedAt"];
export const createRecord = (properties, { existing }) => {
    const id = createNewID(existing);
    const now = new Date();
    return {
        id,
        createdAt: now,
        updatedAt: now,
        ...properties,
    };
};

export const createInitialProject = () =>
    createRecord({
        name: t("gettingStarted.firstProjectName"),
        characters: {},
    });

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
            $inspect("database", this.database);
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
}

export const database = new DatabaseInitiator().database;

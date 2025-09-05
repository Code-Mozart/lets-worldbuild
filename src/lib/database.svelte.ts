import { init } from "@paralleldrive/cuid2";
import type { Database, ID, Project } from "./types";
import { t } from "./i18n.svelte";

const localStorageKey = "lets-worldbuild/v1";

export const createEmptyDatabase = () => {
    return { projects: {} };
};

export const createID = init({ length: 8 });

export const createInitialState = () => {
    const now = new Date();
    const project: Project = {
        id: createID(),
        createdAt: now,
        updatedAt: now,
        name: t("gettingStarted.firstProjectName"),
        characters: {},
    };
    return {
        projects: {
            [project.id]: project,
        },
    };
};

export const loadLocalStorage = (
    fallback = createInitialState,
) => {
    const raw = localStorage.getItem(localStorageKey);
    if (raw === null) return createInitialState();
    return JSON.parse(raw) as Database;
};

export const getMostRecentProject = (database: Database) =>
    Object.values(database.projects).sort((a, b) =>
        a.updatedAt.getTime() - b.updatedAt.getTime()
    )[0];

class State {
    database: Database;
    projectID: ID;

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

        this.projectID = getMostRecentProject(this.database).id;
    }
}

export const state = new State();

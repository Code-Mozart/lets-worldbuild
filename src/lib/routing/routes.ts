import type { Component } from "svelte";
import Recent from "../../pages/Recent.svelte";
import ListCharacters from "../../pages/characters/List.svelte";
import EditCharacter from "../../pages/characters/Edit.svelte";

export interface Route<TComponent extends Component> {
    page: TComponent;
    sidebar?: {
        translationKey: string;
        iconPath: string;
    };
}

const defineRoutes = <T extends Record<string, Route<Component<any>>>>(
    arg: T,
) => arg;

export const routes = defineRoutes({
    "recent": {
        page: Recent,
        sidebar: {
            translationKey: "recent",
            iconPath: "icons/bookmark.svg",
        },
    },
    "characters": {
        page: ListCharacters,
        sidebar: {
            translationKey: "characters",
            iconPath: "icons/group.svg",
        },
    },
    "characters/new": { page: EditCharacter },
    "characters/{id}/edit": { page: EditCharacter },
});
export type RouteHash = keyof typeof routes;

import Recent from "../../pages/Recent.svelte";
import ListCharacters from "../../pages/characters/List.svelte";
import EditCharacter from "../../pages/characters/Edit.svelte";

export const routes = {
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
};

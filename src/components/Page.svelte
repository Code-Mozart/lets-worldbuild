<script lang="ts">
    import type { DAO } from "../data/dao";
    import type { Project } from "../data/schema";
    import { pageMapping, type Page } from "../lib/pages";
    import EditCharacter from "../pages/characters/Edit.svelte";
    import ListCharacters from "../pages/characters/List.svelte";
    import Recent from "../pages/Recent.svelte";

    const pages = pageMapping({
        recent: { content: Recent },
        characters: { content: ListCharacters },
        editCharacter: { content: EditCharacter },
    });

    let {
        page = $bindable(),
        project = $bindable(),
    }: { page: Page; project: DAO<Project> } = $props();
    let selected = $derived(pages[page]);
</script>

<selected.content bind:project />

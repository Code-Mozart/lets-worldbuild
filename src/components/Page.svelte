<script lang="ts">
    import { pageMapping, type Page } from "../lib/pages";
    import Characters from "../pages/Characters.svelte";
    import Recent from "../pages/Recent.svelte";

    const pages = pageMapping({
        recent: { content: Recent },
        characters: { content: Characters },
    });

    let { page = $bindable() }: { page: Page } = $props();
    let selected = $derived(pages[page]);
</script>

<selected.content />

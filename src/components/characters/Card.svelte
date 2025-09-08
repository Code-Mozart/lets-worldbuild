<script lang="ts">
    import type { Snippet } from "svelte";

    let { content, url }: { content: Snippet; url: string } = $props();
</script>

<li>
    <a href={url}>
        {@render content()}
    </a>
</li>

<style>
    li {
        padding: 0em;
        cursor: pointer;

        display: flex;
        flex-direction: column;

        background-color: var(--secondary-background-color);
        border: 1px solid var(--main-foreground-color);
        border-radius: var(--card-corner-radius);
    }
    li:hover {
        color: var(--highlighted-foreground-color);
        background-color: var(--main-background-color);
        border: 3px solid var(--highlighted-foreground-color);
        font-weight: bold;
    }
    li a {
        padding: 0.8em;
        flex: 1;
    }
</style>

<script lang="ts">
    import type { DAO } from "../../data/dao";
    import type { Character } from "../../data/schema";
    import Card from "./Card.svelte";

    let { character = $bindable() }: { character: DAO<Character> } = $props();
</script>

{#snippet content()}
    <div class="characterCard">
        <h2>{character.name}</h2>
    </div>
{/snippet}

<Card {content} />

<style>
    h2 {
        margin: 0;
        font-size: 1.5em;
        line-height: 1.2;
        font-weight: normal;
    }
    :global(li:hover .characterCard h2) {
        font-weight: bold;
    }
</style>

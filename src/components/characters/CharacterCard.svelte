<script>
    import Card from "./Card.svelte";

    let { character } = $props();
</script>

{#snippet content()}
    <div class="characterCard">
        <h2>{character.name}</h2>
    </div>
{/snippet}

<Card {content} url="#/characters/{character.id}/edit" />

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

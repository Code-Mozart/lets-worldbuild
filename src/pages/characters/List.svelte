<script>
    import CharacterCard from "../../components/characters/CharacterCard.svelte";
    import NewCharacterCard from "../../components/characters/NewCharacterCard.svelte";
    let { project = $bindable() } = $props();

    let characters = $derived(Object.values(project.characters));
</script>

<h1>Characters</h1>
<ul class="grid">
    <NewCharacterCard />
    {#each characters as character}
        <CharacterCard {character} />
    {/each}
</ul>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
        grid-auto-rows: minmax(auto, auto);
        gap: 1em;

        list-style-type: none;

        margin: 0;
        padding: 0;
    }
</style>

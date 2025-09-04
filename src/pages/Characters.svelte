<script lang="ts">
    import { db, uid } from "../store/db";
    import type { Character } from "../lib/types";
    let name = "";
    let aka = "";
    let bio = "";

    function add() {
        if (!name.trim()) return alert("Name required");
        const newChar: Character = {
            id: uid(),
            name: name.trim(),
            aka: aka.trim() || undefined,
            bio: bio.trim() || undefined,
            locationId: null,
            relations: [],
        };
        db.update((d) => {
            d.characters.push(newChar);
            return d;
        });
        name = aka = bio = "";
        location.hash = "#/view/character/" + newChar.id;
    }
</script>

<div class="card">
    <h2>Characters</h2>
    <div class="toolbar">
        <input placeholder="Name" bind:value={name} />
        <input placeholder="AKA" bind:value={aka} />
        <button on:click={add}>Add</button>
    </div>
    <div>
        {#each $db.characters as c}
            <div class="row">
                <a href={`#/view/character/${c.id}`}>{c.name}</a>{#if c.aka}
                    <span>– {c.aka}</span>{/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .row {
        padding: 8px;
        border-bottom: 1px dashed #2a2f52;
    }
</style>

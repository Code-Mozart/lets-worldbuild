<script lang="ts">
    import { db, uid } from "../store/db";
    import type { Location } from "../lib/types";
    let name = "";
    let parent = "";

    function add() {
        if (!name.trim()) return alert("Name required");
        const loc: Location = {
            id: uid(),
            name: name.trim(),
            description: "",
            parentId: parent || null,
        };
        db.update((d) => {
            d.locations.push(loc);
            return d;
        });
        location.hash = "#/view/location/" + loc.id;
    }
</script>

<div class="card">
    <h2>Locations</h2>
    <div class="toolbar">
        <input placeholder="Name" bind:value={name} />
        <select bind:value={parent}>
            <option value="">— None —</option>
            {#each $db.locations as l}
                <option value={l.id}>{l.name}</option>
            {/each}
        </select>
        <button on:click={add}>Add</button>
    </div>
    <div>
        {#each $db.locations as l}
            <div class="row">
                <a href={`#/view/location/${l.id}`}>{l.name}</a>
            </div>
        {/each}
    </div>
</div>

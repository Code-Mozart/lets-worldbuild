<script lang="ts">
    import { db } from "../store/db";
    import type { AppState } from "../lib/types";

    // create a typed local copy of settings so binding works
    let local = { eraPositive: "CE", eraNegative: "BCE" };

    $: db.subscribe((s: AppState) => {
        local = { ...s.settings };
    });

    function update() {
        db.update((s) => ({ ...s, settings: { ...local } }));
    }
</script>

<div class="card">
    <h2>Settings</h2>
    <label
        >Positive era label
        <input type="text" bind:value={local.eraPositive} on:input={update} />
    </label>
    <label
        >Negative era label
        <input type="text" bind:value={local.eraNegative} on:input={update} />
    </label>
</div>

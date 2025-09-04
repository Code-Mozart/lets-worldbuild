<script lang="ts">
    import { exportJSON, importJSONFile, resetAll } from "../store/db";
    let fileInput: HTMLInputElement | null = null;

    async function onImport(e: Event) {
        const input = e.target as HTMLInputElement;
        const f = input.files?.[0];
        if (!f) return;
        try {
            await importJSONFile(f);
            alert("Import OK");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            alert("Import failed: " + msg);
        } finally {
            if (fileInput) fileInput.value = "";
        }
    }
</script>

<div class="toolbar">
    <input placeholder="Quick search…" aria-label="search" />
    <button on:click={exportJSON}>Export JSON</button>
    <label class="btn">
        Import JSON
        <input
            bind:this={fileInput}
            type="file"
            accept="application/json"
            on:change={onImport}
            hidden
        />
    </label>
    <button on:click={() => resetAll()}>Reset</button>
</div>

<style>
    .toolbar {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .btn {
        cursor: pointer;
    }
</style>

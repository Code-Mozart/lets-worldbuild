<script lang="ts">
    import { db, uid } from "../store/db";
    import type { Marker } from "../lib/types";
    let fileInput: HTMLInputElement | null = null;

    async function onUpload(e: Event) {
        const f = (e.target as HTMLInputElement).files?.[0];
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
            db.update((s) => ({
                ...s,
                map: { ...s.map, image: String(reader.result) },
            }));
        };
        reader.readAsDataURL(f);
    }

    // Note: for a11y we should use a <button> overlay to add markers or keyboard handlers.
    function addMarkerAt(e: MouseEvent) {
        const box = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = (e.clientX - box.left) / box.width;
        const y = (e.clientY - box.top) / box.height;
        const title = prompt("Marker title");
        if (!title) return;
        const refType = prompt("Link type: character or location?", "location");
        const name = prompt(
            "Type exact name to link (case sensitive) or leave blank.",
        );
        let targetId: string | undefined;
        if (refType === "character")
            targetId = $db.characters.find((c) => c.name === name)?.id;
        if (refType === "location")
            targetId = $db.locations.find((l) => l.name === name)?.id;
        const mark: Marker = {
            id: uid(),
            title,
            x,
            y,
            ref: targetId ? { type: refType as any, id: targetId } : null,
        };
        db.update((s) => ({
            ...s,
            map: { ...s.map, markers: [...s.map.markers, mark] },
        }));
    }
</script>

<div class="card">
    <h2>Map</h2>
    <div class="toolbar">
        <label class="btn"
            >Upload map
            <input
                bind:this={fileInput}
                type="file"
                accept="image/*"
                on:change={onUpload}
                hidden
            />
        </label>
    </div>

    <div
        class="mapbox"
        role="img"
        aria-label="World map"
        on:click={addMarkerAt}
        style="position:relative;height:420px;background:#070a18;border-radius:12px;overflow:hidden"
    >
        {#if $db.map.image}
            <img
                src={$db.map.image}
                alt="map"
                style="width:100%;height:100%;object-fit:contain"
            />
            {#each $db.map.markers as m}
                <div
                    style={`position:absolute;left:${m.x * 100}%;top:${m.y * 100}%;transform:translate(-50%,-100%)`}
                >
                    <a
                        href={`#/view/${m.ref?.type || "location"}/${m.ref?.id || ""}`}
                        >{m.title}</a
                    >
                </div>
            {/each}
        {:else}
            <div class="hint">No map uploaded</div>
        {/if}
    </div>
</div>

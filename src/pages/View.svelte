<script lang="ts">
    import { db } from "../store/db";
    import type { Character, Location, TimelineEvent } from "../lib/types";
    import { formatRichText } from "../lib/format";

    // Use $props() instead of export let
    const props = $props<{ params?: { type?: string; id?: string } }>();
    const params = props.params || {};

    // Lookup item in the store
    const item = $derived(
        params.type === "character"
            ? $db.characters.find((c) => c.id === params.id)
            : params.type === "location"
              ? $db.locations.find((l) => l.id === params.id)
              : params.type === "event"
                ? $db.events.find((e) => e.id === params.id)
                : null,
    );
</script>

{#if !item}
    <div class="card">Not found</div>
{:else}
    <div class="card">
        {#if params.type === "character"}
            <h2>{(item as Character).name}</h2>
            {#if (item as Character).aka}
                <div class="muted">AKA: {(item as Character).aka}</div>
            {/if}
            <div class="bio">
                {@html formatRichText((item as Character).bio || "")}
            </div>
        {/if}

        {#if params.type === "location"}
            <h2>{(item as Location).name}</h2>
            <div>
                {@html formatRichText((item as Location).description || "")}
            </div>
        {/if}

        {#if params.type === "event"}
            <h2>{(item as TimelineEvent).title}</h2>
            <div>{(item as TimelineEvent).summary}</div>
        {/if}
    </div>
{/if}

<script lang="ts">
    import { db } from "../store/db";
    import { renderYearLabel } from "../utils/year";
</script>

<div class="card">
    <h2>Timeline</h2>
    <div>
        {#each $db.events.sort((a, b) => a.year - b.year) as e}
            <div class="row">
                <a href={`#/view/event/${e.id}`}
                    >{renderYearLabel(e.year)} — {e.title}</a
                >
            </div>
        {/each}
    </div>
</div>

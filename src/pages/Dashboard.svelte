<script lang="ts">
    import { db } from "../store/db";
    import { navigateTo } from "../lib/router";
    $: s = $db;
</script>

<div>
    <div class="card">
        <h2>Dashboard</h2>
        <div class="grid">
            <div class="card">
                <strong>Characters</strong>
                <div>{s.characters.length}</div>
                <a href="#/characters">Open →</a>
            </div>
            <div class="card">
                <strong>Locations</strong>
                <div>{s.locations.length}</div>
                <a href="#/locations">Open →</a>
            </div>
            <div class="card">
                <strong>Events</strong>
                <div>{s.events.length}</div>
                <a href="#/timeline">Open →</a>
            </div>
        </div>
    </div>
    <div class="card">
        <h3>Quick start</h3>
        <ol>
            <li>Create Locations</li>
            <li>Create Characters and assign locations</li>
            <li>Create Events and link things</li>
            <li>Upload a Map and add markers</li>
        </ol>
    </div>
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }
</style>

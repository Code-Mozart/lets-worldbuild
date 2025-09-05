<script lang="ts">
    import { state } from "../lib/database.svelte";
    import { t } from "../lib/i18n.svelte";
    import type { ID } from "../lib/types";
    let { projectID = $bindable() }: { projectID: ID } = $props();

    let characters = $derived(state.database.projects[projectID].characters);
</script>

<h1>Characters</h1>
<ul class="grid">
    <li class="new">
        <svg viewBox="0 0 64 64">
            <rect
                x="5"
                y="5"
                width="54"
                height="54"
                rx="6"
                ry="6"
                stroke="var(--stroke-color)"
                stroke-width="1px"
                stroke-dasharray=".2em .2em"
                fill="none"
            />

            <line
                x1="32"
                y1="20"
                x2="32"
                y2="44"
                stroke="var(--stroke-color)"
                stroke-width="1px"
                stroke-linecap="round"
            />
            <line
                x1="20"
                y1="32"
                x2="44"
                y2="32"
                stroke="var(--stroke-color)"
                stroke-width="1px"
                stroke-linecap="round"
            />
        </svg>
        <p>{t("actions.characters.add")}</p>
    </li>
    {#each Object.values(characters) as character}
        <li>
            <h2>{character.name}</h2>
        </li>
    {/each}
</ul>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
        gap: 1em;

        list-style-type: none;

        margin: 0;
        padding: 0;
    }
    p {
        margin: 0;
        padding: 0.5em;
    }
    h2 {
        margin: 0;
        font-size: 1.5em;
        line-height: 1.2;
        font-weight: normal;
    }
    li {
        padding: 0.8em;
        cursor: pointer;

        display: flex;
        flex-direction: column;

        background-color: var(--secondary-background-color);
        border: 1px solid var(--main-foreground-color);
        border-radius: 0.5em;
    }
    li:hover {
        color: var(--highlighted-foreground-color);
        background-color: var(--main-background-color);
        border: 3px solid var(--highlighted-foreground-color);
        font-weight: bold;
    }
    li:hover h2 {
        font-weight: bold;
    }
    li.new {
        text-align: center;
    }
    li.new svg {
        padding: 1em;
        --stroke-color: var(--main-foreground-color);
    }
    li.new:hover svg {
        padding: 1em;
        --stroke-color: var(--highlighted-foreground-color);
    }
</style>

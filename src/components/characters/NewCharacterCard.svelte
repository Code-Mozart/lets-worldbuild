<script lang="ts">
    import { t } from "../../lib/i18n.svelte.js";
    import Card from "./Card.svelte";
</script>

{#snippet content()}
    <div class="characterCard">
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
        <p>{t("pages.characters.list.add")}</p>
    </div>
{/snippet}

<Card {content} url="#/characters/new" />

<style>
    p {
        margin: 0;
        padding: 0.5em;
        text-align: center;
    }
    svg {
        padding: 1em;
        --stroke-color: var(--main-foreground-color);
    }
    :global(li:hover .characterCard svg) {
        padding: 0.5em;
        --stroke-color: var(--highlighted-foreground-color);
    }
</style>

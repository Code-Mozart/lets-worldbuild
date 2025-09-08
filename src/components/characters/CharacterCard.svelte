<script>
    import Card from "./Card.svelte";
    import { t } from "../../lib/i18n.svelte";

    let { character } = $props();

    const dateSnippetArgs = () => {
        const regex = /^(?:.*\?.*)|(?:(?:.*[^\w])?(\d+)[^\d]*)$/;
        return {
            from: character.dateOfBirth?.match(regex)?.[1],
            until: character.dateOfDeath?.match(regex)?.[1],
        };
    };
</script>

{#snippet dateSnippet({ from, until })}
    <span>
        {#if from && until}
            {from} - {until}
        {:else if from}
            {t("pages.characters.list.onlyDateOfBirth", { from })}
        {:else if until}
            {t("pages.characters.list.onlyDateOfDeath", { until })}
        {/if}
    </span>
{/snippet}

{#snippet content()}
    <div class="character-card">
        <div class="card-title">
            <p>{character.titles}</p>
            <h2>{character.firstName} {character.familyName}</h2>
        </div>
        <p>
            {@render dateSnippet(dateSnippetArgs())}
        </p>
    </div>
{/snippet}

<Card {content} url="#/characters/{character.id}/edit" />

<style>
    p {
        margin: 0;
    }
    h2 {
        margin: 0;
        font-size: 1.5em;
        line-height: 1.2;
        font-weight: normal;
    }
    .character-card {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    :global(li:hover .character-card h2) {
        font-weight: bold;
    }
</style>

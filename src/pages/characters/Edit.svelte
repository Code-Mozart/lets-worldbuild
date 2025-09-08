<script>
    import { onDestroy, untrack } from "svelte";
    import { t } from "../../lib/i18n.svelte.js";
    import { some } from "../../util/objects.js";
    import {
        createRecord,
        recordProperties,
    } from "../../data/database.svelte.js";

    let { project = $bindable(), id, showToast } = $props();
    const isNew = !Boolean(id);

    const createNew = () => {
        const record = createRecord(
            {
                firstName: "",
                familyName: "",
                titles: "",
                dateOfBirth: "",
                dateOfDeath: "",
            },
            { existing: project.characters },
        );
        project.characters[record.id] = record;
        return project.characters[record.id];
    };

    const load = (id) => {
        const record = project.characters[id];

        if (!record) {
            showToast({
                content: notFound,
                params: { id },
                durationSeconds: 5,
            });
            location.hash = "#/recent";
        }
        return record;
    };

    const onDelete = () => {
        delete project.characters[character.id];
        location.hash = "#/characters";
    };

    const discardEmpty = () => {
        const predicate = ({ key, value }) =>
            !recordProperties.includes(key) && Boolean(value);
        if (some(character, predicate)) return;

        delete project.characters[character.id];
    };
    if (isNew) onDestroy(discardEmpty);

    const updateTimestamp = () => {
        character.updatedAt = new Date();
    };

    let character = $state((id && load(id)) ?? createNew());

    const attributes = {
        firstName: {},
        familyName: {},
        titles: {},
        dateOfBirth: {},
        dateOfDeath: {},
    };
</script>

{#snippet notFound(id)}
    Character with id '{id}' not found.
{/snippet}

<div class="titlebar">
    <h1>{t(`pages.characters.${id ? "edit" : "new"}.title`)}</h1>
    <button onclick={onDelete}>
        <img src="icons/bin.svg" alt="bin icon" />
        <span>
            {t(`pages.$resource.edit.${isNew ? "discard" : "delete"}`)}
        </span>
    </button>
</div>
<form onsubmit={(e) => e.preventDefault()}>
    {#each Object.keys(attributes) as attribute}
        <label for={attribute}
            >{t(`models.character.attributes.${attribute}`)}</label
        >
        <input
            type="text"
            name={attribute}
            id="lets-worldbuild-character-{attribute}"
            bind:value={character[attribute]}
            oninput={updateTimestamp}
        />
    {/each}
</form>

<style>
    .titlebar {
        display: flex;
        flex-direction: row;
    }
    .titlebar h1 {
        margin-right: auto;
    }
    .titlebar button {
        height: min-content;
        margin-bottom: 1em;

        display: flex;
        flex-direction: row;
        gap: 0.5em;
        align-items: center;
    }
    .titlebar h1 {
        margin-right: auto;
    }
    form {
        display: grid;
        gap: 1em;
        grid-template-columns: auto 1fr;
        align-items: center;
    }
    label {
        text-align: end;
    }
    form input {
        flex: auto 1 0;
    }
</style>

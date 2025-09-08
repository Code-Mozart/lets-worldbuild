<script>
    import { onDestroy } from "svelte";
    import { t } from "../../lib/i18n.svelte.js";
    import { some } from "../../util/objects.js";

    let { project = $bindable(), showToast, id } = $props();

    const newCharacter = { name: "" };
    const loadCharacter = (id) => {
        const record = project.characters.find(id);

        if (!record) {
            showToast({
                content: notFound,
                params: { id },
                durationSeconds: 5,
            });
            location.hash = "#/recent";
        } else {
            record.updatedAt = new Date();
            console.log("should update now");
        }
        return record;
    };

    const saveCharacter = () => {
        if (character.id) {
        } else {
            if (!some(character, ({ value }) => Boolean(value))) return;
            project.characters.insert(character);
        }
    };
    onDestroy(saveCharacter);

    let character = $state((id ? loadCharacter(id) : null) ?? newCharacter);
</script>

{#snippet notFound(id)}
    Character with id '{id}' not found.
{/snippet}

<h1>New Character</h1>
<form onsubmit={(e) => e.preventDefault()}>
    <input
        type="text"
        name="name"
        id="lets-worldbuild-character-name"
        placeholder={t("models.character.attributes.name")}
        bind:value={character.name}
    />
</form>
<p>
    Name: {JSON.stringify(character)}
</p>

<style>
    form {
        display: grid;
    }
    form input {
        flex: auto 1 0;
    }
</style>

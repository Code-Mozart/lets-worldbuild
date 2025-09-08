<script lang="ts">
    import { onDestroy } from "svelte";
    import type { DAO } from "../../data/dao";
    import type { Character, ID, Project } from "../../data/schema";
    import { t } from "../../lib/i18n.svelte.ts";
    import type { Edited } from "../../data/edited";
    import { some } from "../../util/objects";
    import type { ShowToast } from "../../lib/toastsInterface";

    let {
        project = $bindable(),
        showToast,
        id,
    }: { project: DAO<Project>; showToast: ShowToast; id?: ID } = $props();

    const newCharacter = { name: "" };
    const loadCharacter = (id: ID) => {
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

    let character: Edited<Character> = $state(
        (id ? loadCharacter(id) : null) ?? newCharacter,
    );
</script>

{#snippet notFound(id: ID)}
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

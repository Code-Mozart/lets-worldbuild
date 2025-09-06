<script lang="ts">
    let { content } = $props();
</script>

<li>
    {@render content()}
</li>

<style>
    li {
        padding: 0.8em;
        cursor: pointer;

        display: flex;
        flex-direction: column;

        background-color: var(--secondary-background-color);
        border: 1px solid var(--main-foreground-color);
        border-radius: 1em;
    }
    li:hover {
        color: var(--highlighted-foreground-color);
        background-color: var(--main-background-color);
        border: 3px solid var(--highlighted-foreground-color);
        font-weight: bold;
    }
</style>

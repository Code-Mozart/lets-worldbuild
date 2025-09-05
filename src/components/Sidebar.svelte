<script lang="ts">
    import { t } from "../lib/i18n.svelte.ts";
    import { type Page, pageMapping } from "../lib/pages";

    const pages = {
        recent: { icon: "icons/bookmark.svg" },
        characters: { icon: "icons/group.svg" },
    };

    let { page = $bindable() } = $props<{ page: Page }>();
</script>

<aside class="sidebar">
    <h1>{t("title")}</h1>
    <nav>
        {#each Object.entries(pages) as [key, value]}
            <a href="#/{key}" class:active={page === key}>
                <img
                    src={pages[key as keyof typeof pages].icon}
                    alt="{key} icon"
                />
                {t(`pages.${key}`)}
            </a>
        {/each}
    </nav>
</aside>

<style>
    .sidebar {
        flex: auto 0 0;
        border-right: 1px solid var(--main-foreground-color);
        background: var(--secondary-background-color);

        display: flex;
        flex-direction: column;
    }
    nav a {
        display: flex;
        flex-direction: row;
        place-items: center;
        gap: 0.5em;
        padding: 0.4em 1em;
        text-decoration: none;
    }
    nav a:hover {
        background-color: var(--main-background-color);
        font-weight: bold;
    }
    .active:not(:hover) {
        background-color: var(--main-foreground-color);
        color: var(--main-background-color);
        font-weight: bold;
    }
    h1 {
        margin-top: 2rem;
        padding: 0 1em;
        font-size: 1.5em;
        text-wrap: nowrap;
    }

    @media (prefers-color-scheme: light) {
        .active:not(:hover) img {
            filter: invert();
        }
    }

    @media (prefers-color-scheme: dark) {
        img {
            filter: invert();
        }
        .active:not(:hover) img {
            filter: none;
        }
    }
</style>

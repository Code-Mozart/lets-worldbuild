<script>
    import { t } from "../lib/i18n.svelte.js";
    import { routes } from "../lib/routing/routes.js";
    import { filterEntries } from "../util/objects.js";

    const routesWithSidebar = filterEntries(
        routes,
        ({ value }) => "sidebar" in value,
    );

    let { currentHash } = $props();
</script>

<aside class="sidebar">
    <h1>{t("title")}</h1>
    <nav>
        {#each Object.entries(routesWithSidebar) as [hash, route]}
            {@const translation = t(`sidebar.${route.sidebar.translationKey}`)}
            <a href="#/{hash}" class:active={currentHash === hash}>
                <img src={route.sidebar.iconPath} alt="{translation} icon" />
                {translation}
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
        .active:not(:hover) img {
            filter: none;
        }
    }
</style>

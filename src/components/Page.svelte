<script lang="ts">
    import type { DAO } from "../data/dao";
    import type { Project } from "../data/schema";
    import type { CurrentRoute } from "../lib/routing/currentRouteType";
    import { routes } from "../lib/routing/routes";
    import Toasts from "./Toasts.svelte";
    import NotFound from "./NotFound.svelte";
    import { untrack } from "svelte";

    let {
        current,
        project = $bindable(),
    }: { current: CurrentRoute; project: DAO<Project> } = $props();
    let currentRoute = $derived(current.route ?? routes.recent);

    $effect(() => {
        if (current.route !== null) return;
        untrack(() => {
            toastsComponent.showToast({
                content: notFound,
                params: [current.hash],
                durationSeconds: 3,
            });
        });
        location.hash = "#/recent";
    });

    let toastsComponent: Toasts;
</script>

{#snippet notFound(path: string)}
    <NotFound {path} />
{/snippet}

<currentRoute.page bind:project />
<Toasts bind:this={toastsComponent} />

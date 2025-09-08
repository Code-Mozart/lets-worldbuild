<script>
    import { routes } from "../lib/routing/routes";
    import Toasts from "./Toasts.svelte";
    import NotFound from "./NotFound.svelte";
    import { untrack } from "svelte";

    let { current, project = $bindable() } = $props();
    let currentRoute = $derived(current.route ?? routes.recent);

    let showToast = (toast) => {
        toastsComponent.showToast(toast);
    };

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

    let toastsComponent;
</script>

{#snippet notFound(path)}
    <NotFound {path} />
{/snippet}

<currentRoute.page
    bind:project
    {...{
        showToast,
        ...current.params,
    }}
/>
<Toasts bind:this={toastsComponent} />

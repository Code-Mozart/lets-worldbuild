<script>
    import { slide } from "svelte/transition";

    export const showToast = (toast) => {
        const displayedToast = {
            ...toast,
            displayedAt: new Date(),
            wasHovered: false,
        };
        toasts.push(displayedToast);
        if (toast.durationSeconds) {
            setTimeout(() => {
                removeToast(displayedToast, true);
            }, toast.durationSeconds * 1000);
        }
    };

    export const removeToast = (toast, skipIfHovered = false) => {
        toasts = toasts.filter(
            (item) =>
                item.displayedAt !== toast.displayedAt ||
                (skipIfHovered && item.wasHovered),
        );
    };

    let toasts = $state([]);
</script>

<ul class="toasts">
    {#each toasts as toast, index (toast.displayedAt)}
        <li
            class="toast"
            class:pinned={toast.wasHovered}
            transition:slide={{ duration: 200 }}
            onmouseenter={() => (toast.wasHovered = true)}
        >
            <div>
                {@render toast.content(toast.params)}
            </div>
            <button
                onclick={() => removeToast(toast)}
                tabindex={index}
                aria-label="dismiss"
            >
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="currentColor"
                        d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275t.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7t.7.275t.7-.275zM5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
                    />
                </svg>
            </button>
            {#if toast.wasHovered}
                <div class="pin">
                    <img src="icons/pin.svg" alt="pin" />
                </div>
            {/if}
        </li>
    {/each}
</ul>

<style>
    ul.toasts {
        position: absolute;
        z-index: 1;
        top: 2em;
        left: auto;
        right: 2em;
        bottom: auto;

        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: end;

        margin: 0;
        list-style-type: none;
    }

    :global(ul.toasts li.toast) {
        margin: 0;
        padding: 0.5em 1em;
        max-width: max(16em, 20vh);
        width: fit-content;

        background-color: var(--secondary-background-color);
        border: 1px solid var(--main-foreground-color);
        border-radius: var(--card-corner-radius);

        display: flex;
        flex-direction: row;
        gap: 0.5em;
    }
    :global(ul.toasts li.toast div.pin) {
        position: absolute;
        justify-self: end;
        transform: translate(-1.7em, -1.2em);
        padding: 0.2em;
        margin: 0;
        width: fit-content;
        height: fit-content;
        line-height: 0;

        background-color: var(--secondary-background-color);
        border: 1px solid var(--main-foreground-color);
        border-radius: var(--card-corner-radius);
    }
    :global(ul.toasts li.toast button) {
        display: none;
        background-color: transparent;
        border: none;
        border-radius: 0;
        padding: 0;
        height: min-content;
    }
    :global(ul.toasts li.toast:hover button) {
        display: block;
    }
    :global(ul.toasts li.toast button:active) {
        background-color: transparent;
        border: none;
        outline: none;
    }
    :global(ul.toasts li.toast button svg:hover) {
        color: var(--highlighted-foreground-color);
    }
</style>

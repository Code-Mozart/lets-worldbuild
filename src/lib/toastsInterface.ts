import type { Snippet } from "svelte";

export interface Toast {
    content: Snippet<[any]>;
    params: any;
    durationSeconds?: number;
}

export type ShowToast = (toast: Toast) => void;

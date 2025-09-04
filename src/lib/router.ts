// src/lib/router.ts
import { writable } from "svelte/store";

export interface Route {
    page: string;
    params: Record<string, string>;
}

function parseHash(): Route {
    // handle leading '#', leading '/', and empty
    let raw = location.hash || "#/dashboard";
    raw = raw.startsWith("#") ? raw.slice(1) : raw;
    raw = raw.startsWith("/") ? raw.slice(1) : raw;
    const parts = raw.split("/").filter(Boolean);
    const page = parts[0] || "dashboard";
    const params: Record<string, string> = {};

    if (page === "view" && parts.length >= 3) {
        // e.g. view/character/abc123
        params.type = parts[1];
        params.id = parts[2];
    }

    return { page, params };
}

export const route = writable<Route>(parseHash());

window.addEventListener("hashchange", () => {
    route.set(parseHash());
});

// optional helper for navigation
export function navigateTo(hash: string) {
    location.hash = hash;
}

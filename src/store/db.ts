import { get, type Writable, writable } from "svelte/store";
import type {
    AppState,
    Character,
    Location,
    Marker,
    TimelineEvent,
} from "../lib/types";

const STORAGE_KEY = "lets-wordbuild-db-v1";

// initial state (must match AppState)
const initialState: AppState = {
    settings: { eraPositive: "CE", eraNegative: "BCE" },
    characters: [],
    locations: [],
    events: [],
    map: { image: null, markers: [] },
};

function loadState(): AppState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return initialState;
        const parsed = JSON.parse(raw);
        // basic validation: required top-level keys
        if (
            !parsed || !Array.isArray(parsed.characters) ||
            !Array.isArray(parsed.locations) || !Array.isArray(parsed.events) ||
            typeof parsed.map !== "object"
        ) {
            return initialState;
        }
        // ensure map shape
        parsed.map = parsed.map || { image: null, markers: [] };
        parsed.map.markers = Array.isArray(parsed.map.markers)
            ? parsed.map.markers
            : [];
        return parsed as AppState;
    } catch (e) {
        console.warn(
            "Failed to parse stored state, falling back to initial",
            e,
        );
        return initialState;
    }
}

function persist(state: AppState) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn("Failed to persist state", e);
    }
}

function createStore(): Writable<AppState> {
    const s = writable<AppState>(loadState());
    s.subscribe((v) => persist(v));
    return s;
}

export const db: Writable<AppState> = createStore();

// helpers & exported API
export const uid = (): string => Math.random().toString(36).slice(2, 10);

export function addCharacter(c: Character) {
    const s = get(db);
    db.set({ ...s, characters: [...s.characters, c] });
}

export function addLocation(l: Location) {
    const s = get(db);
    db.set({ ...s, locations: [...s.locations, l] });
}

export function addEvent(e: TimelineEvent) {
    const s = get(db);
    db.set({ ...s, events: [...s.events, e] });
}

export function exportJSON() {
    const blob = new Blob([JSON.stringify(get(db), null, 2)], {
        type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "lets-wordbuild.json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export async function importJSONFile(file: File) {
    const text = await file.text();
    const parsed = JSON.parse(text);
    // minimal validation
    if (
        !parsed || !Array.isArray(parsed.characters) ||
        !Array.isArray(parsed.locations) || !Array.isArray(parsed.events)
    ) {
        throw new Error(
            "Invalid import file: missing required arrays (characters/locations/events)",
        );
    }
    // ensure map defaults
    parsed.map = parsed.map || { image: null, markers: [] };
    parsed.map.markers = Array.isArray(parsed.map.markers)
        ? parsed.map.markers
        : [];
    db.set(parsed as AppState);
}

export function resetAll(skipConfirm = false) {
    if (!skipConfirm && !confirm("This will clear all data. Continue?")) return;
    db.set(initialState);
    localStorage.removeItem(STORAGE_KEY);
}

export type ID = string;

export interface Relation {
    type: string;
    targetId: ID;
}

export interface Character {
    id: ID;
    name: string;
    aka?: string;
    bio?: string;
    locationId?: ID | null;
    relations: Relation[]; // use relations for parent/child/spouse/etc
    birth?: number | null;
    death?: number | null;
}

export interface Location {
    id: ID;
    name: string;
    aka?: string;
    description?: string;
    parentId?: ID | null;
}

// Rename the model type to avoid collision with DOM Event
export interface TimelineEvent {
    id: ID;
    title: string;
    year: number;
    month?: number | null;
    day?: number | null;
    locationId?: ID | null;
    summary?: string;
    links: Relation[];
}

export interface Marker {
    id: ID;
    title: string;
    x: number; // 0..1
    y: number; // 0..1
    ref?: { type: "character" | "location"; id: ID } | null;
}

export interface MapData {
    image: string | null;
    markers: Marker[];
}

export interface AppState {
    settings: { eraPositive: string; eraNegative: string };
    characters: Character[];
    locations: Location[];
    events: TimelineEvent[];
    map: MapData;
}

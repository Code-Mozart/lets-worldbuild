export type Records<T> = Record<ID, T>;

export type ID = string;

export interface Entity {
    id: ID;
    createdAt: Date;
    updatedAt: Date;
}

export interface Project extends Entity {
    name: string;
    characters: Records<Character>;
}

export interface Character extends Entity {
    name: string;
}

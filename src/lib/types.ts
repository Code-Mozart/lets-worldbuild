export type ID = string;

export interface Entity {
    id: ID;
    createdAt: Date;
    updatedAt: Date;
}

export type Table<T> = Record<ID, T>;

export interface Database {
    projects: Table<Project>;
}

export interface Project extends Entity {
    name: string;
    characters: Table<Character>;
}

export interface Character extends Entity {
    name: string;
}

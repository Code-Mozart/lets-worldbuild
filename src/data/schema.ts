export type Records<T> = Record<ID, T>;
export type Shape<T> = {
    [K in keyof Omit<T, keyof Entity>]: T[K] extends
        Records<infer U extends Entity> ? Shape<U>
        : null;
};

export type NestedKeys<T> = {
    [K in keyof T as T[K] extends Records<unknown> ? K : never]: T[K];
};
export type LeafKeys<T> = {
    [K in keyof T as T[K] extends Records<unknown> ? never : K]: T[K];
};
export type Properties<T> = Omit<LeafKeys<T>, keyof Entity>;

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

export const characterShape: Shape<Character> = {
    name: null,
};
export const projectShape: Shape<Project> = {
    name: null,
    characters: characterShape,
};

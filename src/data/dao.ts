import type { Entity, ID, Records } from "./schema";

export const makeDAO = <T>(
    records: Record<keyof T, Records<Entity>>,
) => {
    type Properties = Omit<T, keyof Entity>;
    return {
        get: () => {
            throw Error("Not implemented");
        },
        find: (id: ID) => {
            throw Error("Not implemented");
        },
        create: (properties: Properties) => {
            throw Error("Not implemented");
        },
        update: (id: ID, properties: Partial<Properties>) => {
            throw Error("Not implemented");
        },
        delete: (id: ID) => {
            throw Error("Not implemented");
        },
    };
};

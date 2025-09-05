import { init } from "@paralleldrive/cuid2";
import type { Entity, ID, Records } from "./schema";

export const cuid = init({ length: 8 });

export const createResource = <T extends Entity>(
    { getRecords, setRecords }: {
        getRecords: () => Records<T>;
        setRecords: (records: Records<T>) => void;
    },
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

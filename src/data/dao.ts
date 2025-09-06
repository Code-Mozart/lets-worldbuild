import type { Entity, ID, Records } from "./schema";

type NestedKeys<T> = {
    [K in keyof T as T[K] extends Records<unknown> ? K : never]: T[K];
};
type LeafKeys<T> = {
    [K in keyof T as T[K] extends Records<unknown> ? never : K]: T[K];
};
type NestedEntity<T, K extends keyof T> = T[K] extends
    Records<infer U extends Entity> ? U : never;

export const makeDAO = <T>(
    properties: Record<keyof T, Records<Entity> | unknown>,
) => Object.fromEntries(
    Object.entries(properties).map((
        [key, value],
    ) => [key, isNestedRecords(value) ? nested(value) : value]),
) as
    & LeafKeys<T>
    & {
        [K in keyof NestedKeys<T>]: ReturnType<
            typeof nested<NestedEntity<T, K>>
        >;
    };

export const isEntityRow = <T extends Entity>(
    value: T | NonNullable<unknown>,
): value is T =>
    typeof value === "object" &&
    "id" in value &&
    "createdAt" in value &&
    "updatedAt" in value;

export const isNestedRecords = <T extends Entity>(
    value: Records<T> | unknown,
): value is Records<T> =>
    !!value &&
    typeof value === "object" &&
    Object.values(value).every(isEntityRow);

export const nested = <T extends Entity>(records: Records<T>) => {
    const get = () => records;
    const find = (id: ID) => {
        throw Error("Not implemented");
    };
    const insert = (properties: Omit<LeafKeys<T>, keyof Entity>) => {
        throw Error("Not implemented");
    };
    const delete_ = (id: ID) => {
        throw Error("Not implemented");
    };

    return { get, find, insert, delete: delete_ };
};

interface Foo extends Entity {
    abc: string;
    bars: Records<Bar>;
}

interface Bar extends Entity {
    num: number;
}

const now = new Date();
const foo = {
    abc: "hello",
    id: "foo",
    createdAt: now,
    updatedAt: now,
    bars: {
        "a": { num: 12, id: "a", createdAt: now, updatedAt: now },
        "b": { num: 2, id: "b", createdAt: now, updatedAt: now },
    },
};
const dao = makeDAO<Foo>(foo);
dao.bars.insert({ num: 12 });

import {
    fillValues,
    filterEntries,
    findValue,
    mapEntries,
    mapValues,
} from "../util/objects";
import { cuid } from "./cuid";
import type { Entity, ID, Records, Shape } from "./schema";

type NestedKeys<T> = {
    [K in keyof T as T[K] extends Records<unknown> ? K : never]: T[K];
};
type LeafKeys<T> = {
    [K in keyof T as T[K] extends Records<unknown> ? never : K]: T[K];
};
type NestedEntity<T, K extends keyof T> = T[K] extends
    Records<infer U extends Entity> ? U : never;

export type DAO<T> =
    & LeafKeys<T>
    & {
        [K in keyof NestedKeys<T>]: ReturnType<
            typeof nested<NestedEntity<T, K>>
        >;
    };
export const makeDAO = <T extends Record<keyof T, Records<Entity> | unknown>>(
    obj: T,
    shape: Shape<T>,
) => {
    return mapEntries(
        obj,
        ({ key, value: property }) => [
            key,
            isNestedRecords(property)
                ? nested(property, shape[key as keyof Omit<T, keyof Entity>]!)
                : property,
        ],
    ) as Record<string, unknown> as DAO<T>;
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

export const nested = <T extends Entity>(
    records: Records<T>,
    shape: Shape<T>,
) => {
    const get = () => mapValues(records, ({ value }) => makeDAO(value, shape));
    const find = (id: ID) => {
        const record = findValue(records, ({ key }) => key === id);
        return record === null ? null : makeDAO(record, shape);
    };
    const insert = (properties: Omit<LeafKeys<T>, keyof Entity>) => {
        const id = cuid();
        if (id in records) {
            throw Error(
                `newly generated id '${id}' collided with existing record`,
            );
        }

        const now = new Date();
        const newRecord = {
            id,
            createdAt: now,
            updatedAt: now,
            ...fillValues(
                filterEntries(shape, ({ value }) => value !== null),
                {},
            ),
            ...properties,
        } as T;
        records[id] = newRecord;
        return makeDAO(newRecord, shape);
    };
    const delete_ = (id: ID) => {
        if (!(id in records)) return false;
        return delete records[id];
    };

    return { get, find, insert, delete: delete_ };
};

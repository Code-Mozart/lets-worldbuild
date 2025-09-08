import {
    fillValues,
    filterEntries,
    findValue,
    mapEntries,
    mapValues,
} from "../util/objects";
import { cuid } from "./cuid";
import type {
    Entity,
    ID,
    LeafKeys,
    NestedKeys,
    Properties,
    Records,
    Shape,
} from "./schema";

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
        ({ key, value: property }) => {
            const propertyShape = shape[key as keyof Omit<T, keyof Entity>];
            const accessor = isNested(property, propertyShape)
                ? nested(property, propertyShape!)
                : property;
            return [key, accessor];
        },
    ) as Record<string, unknown> as DAO<T>;
};

export const isNested = <T extends Entity>(
    value: unknown,
    shape: Shape<T> | null | undefined,
): value is Records<T> => shape !== null && shape !== undefined;

export const nested = <T extends Entity>(
    records: Records<T>,
    shape: Shape<T>,
) => {
    const get = () => mapValues(records, ({ value }) => makeDAO(value, shape));
    const find = (id: ID) => {
        const record = findValue(records, ({ key }) => key === id);
        return record === null ? null : makeDAO(record, shape);
    };
    const insert = (properties: Properties<T>) => {
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

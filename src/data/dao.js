import {
    fillValues,
    filterEntries,
    findValue,
    mapEntries,
    mapValues,
} from "../util/objects";
import { cuid } from "./cuid";

export const makeDAO = (obj, shape) => {
    return mapEntries(
        obj,
        ({ key, value: property }) => {
            const propertyShape = shape[key];
            const accessor =
                propertyShape !== null && propertyShape !== undefined
                    ? nested(property, propertyShape)
                    : property;
            return [key, accessor];
        },
    );
};

export const nested = (records, shape) => {
    const get = () => mapValues(records, ({ value }) => makeDAO(value, shape));
    const find = (id) => {
        const record = findValue(records, ({ key }) => key === id);
        return record === null ? null : makeDAO(record, shape);
    };
    const insert = (properties) => {
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
        };
        records[id] = newRecord;
        return makeDAO(newRecord, shape);
    };
    const delete_ = (id) => {
        if (!(id in records)) return false;
        return delete records[id];
    };

    return { get, find, insert, delete: delete_ };
};

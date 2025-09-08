export const mapEntries = (obj, fn) =>
    Object.fromEntries(
        Object.entries(obj).map(
            ([k, v]) => fn({ key: k, value: v }),
        ),
    );

export const mapValues = (obj, fn) =>
    mapEntries(obj, ({ key, value }) => [key, fn({ key, value })]);

export const mapKeys = (obj, fn) =>
    Object.fromEntries(
        Object.entries(obj).map(
            ([k, v]) => [fn({ key: k, value: v }), v],
        ),
    );

export const filterEntries = (obj, predicate) =>
    Object.fromEntries(
        Object.entries(obj).filter(([k, v]) => predicate({ key: k, value: v })),
    );

export const some = (obj, predicate) =>
    Object.entries(obj).some(([k, v]) => predicate({ key: k, value: v }));

export const findEntry = (
    obj,
    predicate,
) => (
    Object.entries(obj)
        .find(([k, v]) => predicate({ key: k, value: v })) ??
        null
);

export const findValue = (obj, predicate) =>
    findEntry(obj, predicate)?.[1] ?? null;

export const fillValues = (obj, value) => mapValues(obj, () => value);

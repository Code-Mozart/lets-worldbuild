export interface FnParameters<T, K = keyof T> {
    key: K;
    value: T[keyof T];
}

export type MapFn<T extends object, U> = (
    { key, value }: FnParameters<T>,
) => U;

export type PredicateFn<T extends object> = (
    { key, value }: FnParameters<T>,
) => boolean;

export const mapEntries = <T extends object, K extends PropertyKey, V>(
    obj: T,
    fn: MapFn<T, [K, V]>,
) => Object.fromEntries(
    Object.entries(obj).map(
        ([k, v]) => fn({ key: k as keyof T, value: v as T[keyof T] }),
    ),
) as { [_ in K]: V };

export const mapValues = <T extends object, U>(obj: T, fn: MapFn<T, U>) =>
    mapEntries(obj, ({ key, value }) => [key, fn({ key, value })]) as {
        [K in keyof T]: U;
    };

export const mapKeys = <T extends object, U extends PropertyKey>(
    obj: T,
    fn: MapFn<T, U>,
) => {
    return Object.fromEntries(
        Object.entries(obj).map(
            ([k, v]) => [fn({ key: k as keyof T, value: v as T[keyof T] }), v],
        ),
    ) as { [K in U]: T[keyof T] };
};

export const filterEntries = <T extends object>(
    obj: T,
    predicate: PredicateFn<T>,
) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([k, v]) =>
            predicate({ key: k as keyof T, value: v as T[keyof T] })
        ),
    ) as Partial<T>;
};

export const findEntry = <T extends object>(
    obj: T,
    predicate: PredicateFn<T>,
) => (Object.entries(obj).find(([k, v]) =>
    predicate({ key: k as keyof T, value: v as T[keyof T] })
) ?? null) as [keyof T, T[keyof T]] | null;

export const findValue = <T extends object>(
    obj: T,
    predicate: PredicateFn<T>,
) => findEntry(obj, predicate)?.[1] ?? null;

export const fillValues = <T extends object, U>(obj: T, value: U) =>
    mapValues(obj, () => value);

/**
 * Map over the values of an object.
 */
export function mapValues<T extends object, U>(
    obj: T,
    fn: (value: T[keyof T], key: keyof T) => U,
): { [K in keyof T]: U } {
    return Object.fromEntries(
        Object.entries(obj).map((
            [k, v],
        ) => [k, fn(v as T[keyof T], k as keyof T)]),
    ) as { [K in keyof T]: U };
}

/**
 * Map over the keys of an object.
 */
export function mapKeys<T extends object, U extends string | number | symbol>(
    obj: T,
    fn: (key: keyof T) => U,
): { [K in U]: T[keyof T] } {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [fn(k as keyof T), v]),
    ) as { [K in U]: T[keyof T] };
}

/**
 * Filter object entries by a predicate.
 */
export function filterEntries<T extends object>(
    obj: T,
    predicate: (value: T[keyof T], key: keyof T) => boolean,
): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([k, v]) =>
            predicate(v as T[keyof T], k as keyof T)
        ),
    ) as Partial<T>;
}

/**
 * Pick specific keys from an object.
 */
export function pick<T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
): Pick<T, K> {
    const result: Partial<T> = {};
    for (const key of keys) {
        if (key in obj) result[key] = obj[key];
    }
    return result as Pick<T, K>;
}

/**
 * Omit specific keys from an object.
 */
export function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: K[],
): Omit<T, K> {
    const result: Partial<T> = { ...obj };
    for (const key of keys) {
        delete result[key];
    }
    return result as Omit<T, K>;
}

/**
 * Merge two objects deeply (shallow merge by default).
 */
export function merge<T extends object, U extends object>(
    target: T,
    source: U,
): T & U {
    return { ...target, ...source };
}

/**
 * Check if all values in an object satisfy a predicate.
 */
export function allValues<T extends object>(
    obj: T,
    predicate: (value: T[keyof T], key: keyof T) => boolean,
): boolean {
    return Object.entries(obj).every(([k, v]) =>
        predicate(v as T[keyof T], k as keyof T)
    );
}

/**
 * Map over object entries with both key and value, producing a new object.
 */
export function mapEntries<T extends object, U>(
    obj: T,
    fn: (value: T[keyof T], key: keyof T) => [string, U],
): Record<string, U> {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => fn(v as T[keyof T], k as keyof T)),
    );
}

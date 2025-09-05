export const pages = {
    "recent": "recent",
    "characters": "characters",
    // "locations": "locations",
    // "timeline": "timeline",
    // "map": "map",
};
export type Page = keyof typeof pages;

/**
 * Identity function for pages. This ensures that the parameter t must
 * have all keys of `pages`.
 */
export const pageMapping = <X, T extends Record<Page, X>>(t: T) => t;

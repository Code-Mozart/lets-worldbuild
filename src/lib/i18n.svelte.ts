import en from "../translations/en.json";

export type Language = "en";
let language: Language = $state("en");

export const t = (key: string, args: Record<string, unknown> = {}) => {
    const translations = {
        "en": en,
    }[language];

    const path = key.split(".");
    let current: unknown = translations;
    path.forEach((next) => {
        if (
            typeof current !== "object" ||
            current === null ||
            !(next in current)
        ) {
            return missingTranslation(key);
        }
        current = (current as object & { [next]: unknown })[next];
    });
    return typeof current === "string"
        ? resolve(current, args)
        : missingTranslation(key);
};

const resolve = (template: string, args: Record<string, unknown>) =>
    Object.entries(args).reduce(
        (acc, [placeholder, value]) =>
            acc.replaceAll(`\\{${placeholder}\\}`, String(value)),
        template,
    );

const missingTranslation = (key: string) => {
    console.warn(`missing translation for '${key}' in language ${language}`);
    return key;
};

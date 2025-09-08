import en from "../translations/en.json";

let language = $state("en");

export const t = (key, args = {}) => {
    const translations = {
        "en": en,
    }[language];

    const path = key.split(".");
    let current = translations;
    path.forEach((next) => {
        if (
            typeof current !== "object" ||
            current === null ||
            !(next in current)
        ) {
            return missingTranslation(key);
        }
        current = current[next];
    });
    return typeof current === "string"
        ? resolve(current, args)
        : missingTranslation(key);
};

const resolve = (template, args) =>
    Object.entries(args).reduce(
        (acc, [placeholder, value]) =>
            acc.replaceAll(RegExp(`\\{${placeholder}\\}`, "g"), String(value)),
        template,
    );

const missingTranslation = (key) => {
    console.warn(`missing translation for '${key}' in language ${language}`);
    return key;
};

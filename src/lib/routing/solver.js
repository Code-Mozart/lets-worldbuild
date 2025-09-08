import { partition } from "../../util/arrays";
import { unreachable } from "../../util/errors";
import { RoutingError } from "./error";

const variableRegex = /\{[\w\-]+\}/;

export const parsePath = (path) => {
    if (path.startsWith("#")) path = path.slice(1);
    if (path.startsWith("/")) path = path.slice(1);
    return path;
};

export const solvePath = (routes, parsed) => {
    const parts = parsed.split("/");
    let options = parseRoutes(routes).filter((option) =>
        option.parts.length === parts.length
    );
    if (options.length === 0) {
        return noRoute(parsed);
    }

    const params = {};
    parts.forEach((part, i) => {
        const { directMatches, placeholderMatches } = partition(
            options,
            ({ item: option }) => {
                const optionPart = option.parts[i];
                if (optionPart.type === "placeholder") {
                    return "placeholderMatches";
                }
                return optionPart.text === part ? "directMatches" : "discarded";
            },
        );

        if (directMatches.length > 0) {
            options = directMatches;
            return;
        }

        if (placeholderMatches.length === 0) {
            options = [];
            return;
        }
        placeholderMatches.forEach((option) => {
            if (option.parts[i].type !== "placeholder") throw unreachable();
            params[option.full] ??= {};
            params[option.full][option.parts[i].placeholder] = part;
        });
        options = placeholderMatches;
    });

    if (options.length === 1) {
        const [match] = options;
        return {
            route: match.full,
            params: params[match.full] ?? {},
        };
    }
    if (options.length > 1) throw new RoutingError("More than 1 route matches");
    return noRoute(parsed);
};

export const parseRoutes = (routes) =>
    routes
        .map((option) => ({
            full: option,
            parts: option
                .split("/")
                .map((part) => (variableRegex.test(part)
                    ? {
                        type: "placeholder",
                        placeholder: part.slice(1, -1),
                    }
                    : {
                        type: "static",
                        text: part,
                    })
                ),
        }));

export const noRoute = (path) => {
    console.warn(`Page ${path} not found`);
    return { route: null, params: {} };
};

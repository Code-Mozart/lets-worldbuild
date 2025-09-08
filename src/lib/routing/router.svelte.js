import { routes } from "./routes";
import { parsePath, solvePath } from "./solver";

export let router = $state(
    solvePath(Object.keys(routes), parsePath(location.hash)),
);

window.addEventListener("hashchange", () => {
    const parsed = parsePath(location.hash || "#/recent");
    const result = solvePath(
        Object.keys(routes),
        parsed,
    );
    router.params = result.params;
    router.hash = result.route ?? parsed;
    router.route = result.route === null ? null : routes[result.route];
});

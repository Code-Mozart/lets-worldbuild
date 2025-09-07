import { routes } from "./routes";
import { parsePath, solvePath } from "./solver";
import type { CurrentRoute } from "./currentRouteType";

export let router: CurrentRoute = $state({
    route: routes.recent,
    hash: "recent",
    params: {},
});

window.addEventListener("hashchange", () => {
    const parsed = parsePath(location.hash || "#/recent");
    const result = solvePath(
        Object.keys(routes) as (keyof typeof routes)[],
        parsed,
    )!;
    router.params = result.params;
    router.hash = result.route ?? parsed;
    router.route = result.route === null ? null : routes[result.route];
});

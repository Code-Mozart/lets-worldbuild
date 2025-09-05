import { type Page, pages } from "./pages";

export let router: { route: Page } = $state({ route: "recent" });
window.addEventListener("hashchange", () => {
    let path = location.hash || "#/recent";
    if (path.startsWith("#")) path = path.slice(1);
    if (path.startsWith("/")) path = path.slice(1);
    const parts = path.split("/").filter((part) => part.trim().length > 0);
    path = parts[0];

    router.route = path in pages ? (path as Page) : "recent";
});

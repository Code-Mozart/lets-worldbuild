import type { Component } from "svelte";
import type { Route, RouteHash } from "./routes";

export type CurrentRoute = {
    route: Route<Component<any>>;
    hash: RouteHash;
    params: Record<string, string>;
} | {
    route: null;
    hash: string;
    params: Record<string, string>;
};

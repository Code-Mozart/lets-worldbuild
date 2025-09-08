import { describe, expect, it } from "vitest";
import { solvePath } from "./solver";
import { cuid } from "../../data/cuid";

describe("solvePath", () => {
    describe("with flat routes", () => {
        const routes = [
            "foo",
            "bar",
        ];

        describe("when solving for a non-existent route", () => {
            it("return null", () =>
                expect(
                    solvePath(routes, "non-existent"),
                ).toEqual({ route: null, params: {} }));
        });

        describe("when solving for a route", () => {
            it("finds the correct one", () =>
                expect(
                    solvePath(routes, "foo"),
                ).toEqual({ route: "foo", params: {} }));
        });
    });

    describe("with complex routes", () => {
        const routes = [
            "foo",
            "foo/new",
            "foo/{id}",
            "foo/{fooID}/bar/{barID}",
        ];

        describe("when solving for a non-existent route", () => {
            it("return null", () =>
                expect(
                    solvePath(routes, `foo/${cuid()}/edit`),
                ).toEqual({ route: null, params: {} }));
        });
        describe("when solving for a route with an id", () => {
            const id = cuid();
            it("finds the correct one", () =>
                expect(
                    solvePath(routes, `foo/${id}`),
                ).toEqual({ route: "foo/{id}", params: { id } }));
        });
    });
});

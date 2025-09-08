import { describe, expect, it } from "vitest";
import { partition } from "./arrays";

const arr = [1, 2, 4, 5, 7, 7, 8];

describe("partition", () => {
    describe("when passing an empty array", () => {
        it("returns an empty object", () =>
            expect(
                partition([], () => "even"),
            ).toEqual({}));
    });

    describe("when partitioning into even and odd", () => {
        it("is correct", () =>
            expect(
                partition(arr, ({ item }) => item % 2 === 0 ? "even" : "odd"),
            ).toEqual({
                even: [2, 4, 8],
                odd: [1, 5, 7, 7],
            }));
    });

    describe("when one of the partitions never occurs", () => {
        const arr = [2, 4, 6];
        it("returns an empty array for the other partition", () => {
            const { even, odd } = partition(
                arr,
                ({ item }) => item % 2 === 0 ? "even" : "odd",
            );
            expect({ even, odd }).toEqual({ even: arr, odd: [] });
        });
    });
});

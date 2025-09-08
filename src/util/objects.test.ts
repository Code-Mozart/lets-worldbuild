import { describe, expect, it } from "vitest";
import {
    fillValues,
    filterEntries,
    findEntry,
    findValue,
    mapEntries,
    mapKeys,
    mapValues,
    some,
} from "./objects";

const obj = {
    a: 1,
    b: 2,
    c: 3,
};

describe("mapEntries", () => {
    describe("when passing an empty object", () => {
        it("returns the empty object", () =>
            expect(
                mapEntries({}, ({ key, value }) => [key, value]),
            ).toEqual({}));
    });

    describe("when mapping the key-value tuple to itself", () => {
        it("returns itself", () =>
            expect(
                mapEntries(obj, ({ key, value }) => [key, value]),
            ).toEqual(obj));
    });

    describe("when transforming the values", () => {
        it("is correct", () =>
            expect(
                mapEntries(obj, ({ key, value }) => [key, value * 2]),
            ).toEqual(
                { a: 2, b: 4, c: 6 },
            ));
    });

    describe("when transforming the keys", () => {
        it("is correct", () =>
            expect(
                mapEntries(obj, ({ key, value }) => [key + key, value]),
            ).toEqual(
                { aa: 1, bb: 2, cc: 3 },
            ));
    });
});

describe("mapValues", () => {
    describe("when passing an empty object", () => {
        it("returns the empty object", () =>
            expect(
                mapValues({}, ({ value }) => value),
            ).toEqual({}));
    });

    describe("when mapping the values to themselves", () => {
        it("is correct", () =>
            expect(
                mapValues(obj, ({ value }) => value),
            ).toEqual(obj));
    });

    describe("when doubling values", () => {
        it("is correct", () =>
            expect(
                mapValues(obj, ({ value }) => value * 2),
            ).toEqual({ a: 2, b: 4, c: 6 }));
    });
});

describe("mapKeys", () => {
    describe("when passing an empty object", () => {
        it("returns the empty object", () =>
            expect(
                mapValues({}, ({ key }) => key),
            ).toEqual({}));
    });

    describe("when mapping the keys to themselves", () => {
        it("is correct", () =>
            expect(
                mapKeys(obj, ({ key }) => key),
            ).toEqual(obj));
    });

    describe("when repeating the characters in each key", () => {
        it("is correct", () =>
            expect(
                mapKeys(obj, ({ key }) => key + key),
            ).toEqual(
                { aa: 1, bb: 2, cc: 3 },
            ));
    });
});

describe("some", () => {
    describe("when passing an empty object", () => {
        it("returns false", () =>
            expect(
                some({}, () => true),
            ).toBeFalsy());
    });

    describe("when no entries match", () => {
        it("returns false", () =>
            expect(
                some(obj, ({ value }) => value > 10),
            ).toBeFalsy());
    });

    describe("when at least 1 entry matches", () => {
        it("returns true", () =>
            expect(
                some(obj, ({ key }) => key === "a"),
            ).toBeTruthy());
    });
});

describe("filterEntries", () => {
    describe("when passing an empty object", () => {
        it("returns the empty object", () =>
            expect(
                filterEntries({}, () => true),
            ).toEqual({}));
    });

    describe("when filtering nothing", () => {
        it("is returns the original input", () =>
            expect(
                filterEntries(obj, () => true),
            ).toEqual(obj));
    });

    describe("when filtering out odd values", () => {
        it("is correct", () =>
            expect(
                filterEntries(obj, ({ value }) => value % 2 === 0),
            ).toEqual({ b: 2 }));
    });

    describe("when filtering everything out", () => {
        it("returns an empty object", () =>
            expect(
                filterEntries(obj, () => false),
            ).toEqual({}));
    });
});

describe("findEntry", () => {
    describe("when passing an empty object", () => {
        it("returns null", () =>
            expect(
                findEntry({}, () => true),
            ).toBeNull());
    });

    describe("when finding an even value", () => {
        it("it returns the first entry with an even value", () =>
            expect(
                findEntry(obj, ({ value }) => value % 2 === 0),
            ).toEqual(["b", 2]));
    });

    describe("when nothing matches", () => {
        it("returns null", () =>
            expect(
                findEntry(obj, ({ value }) => value > 10),
            ).toBeNull());
    });
});

describe("findValue", () => {
    describe("when passing an empty object", () => {
        it("returns null", () =>
            expect(
                findValue({}, () => true),
            ).toBeNull());
    });

    describe("when finding a matching value", () => {
        it("it returns the first matching value", () =>
            expect(
                findValue(obj, ({ value }) => value > 1),
            ).toBe(2));
    });

    describe("when nothing matches", () => {
        it("returns null", () =>
            expect(
                findValue(obj, ({ value }) => value > 10),
            ).toBeNull());
    });
});

describe("fillValues", () => {
    describe("when passing an empty object", () => {
        it("returns the empty object", () =>
            expect(
                fillValues({}, 99),
            ).toEqual({}));
    });

    describe("when filling with a constant value", () => {
        it("is correct", () =>
            expect(
                fillValues(obj, 99),
            ).toEqual({ a: 99, b: 99, c: 99 }));
    });

    describe("when filling with null", () => {
        it("is correct", () =>
            expect(
                fillValues(obj, null),
            ).toEqual({ a: null, b: null, c: null }));
    });
});

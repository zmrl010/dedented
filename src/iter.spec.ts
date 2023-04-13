import { describe, expect, it } from "vitest";
import { zip } from "./iter.js";

describe("zip()", () => {
  it("should return an iterable", () => {
    const result = zip([1, 2, 3], "abc");

    expect(result[Symbol.iterator]).toBeTypeOf("function");
  });

  it("should return an iterable when passed nothing", () => {
    const result = zip();

    expect(result[Symbol.iterator]).toBeTypeOf("function");
  });

  it.each<Iterable<unknown>[][]>([
    [
      [[1, 2, 3], "abc"],
      [
        [1, "a"],
        [2, "b"],
        [3, "c"],
      ],
    ],
    [
      ["abc", ["a", "b", "c"]],
      [
        ["a", "a"],
        ["b", "b"],
        ["c", "c"],
      ],
    ],
    [[], []],
    [
      [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
      ],
      [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ],
    ],
  ])("zip(...%j) -> ...%j", (iterables, expected) => {
    const result = zip(...iterables);

    expect([...result]).toMatchObject([...expected]);
  });
});

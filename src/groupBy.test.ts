import { expect } from "expect";
import { describe, test } from "node:test";
import { groupBy } from "./groupBy.js";

describe("groupBy", () => {
  test("groups an array of objects by a property", () => {
    const people = [
      { name: "Alice", age: 25 },
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 25 },
    ];
    const grouped = groupBy(people, (person) => person.age);
    expect(grouped).toEqual({
      "25": [
        { name: "Alice", age: 25 },
        { name: "Charlie", age: 25 },
      ],
      "30": [{ name: "Bob", age: 30 }],
    });
  });

  test("groups an array of numbers by parity", () => {
    const numbers = [1, 2, 3, 4, 5];
    const grouped = groupBy(numbers, (n) => (n % 2 === 0 ? "even" : "odd"));
    expect(grouped).toEqual({
      odd: [1, 3, 5],
      even: [2, 4],
    });
  });

  test("handles an empty array", () => {
    const emptyArray: number[] = [];
    const grouped = groupBy(emptyArray, (n) => n);
    expect(grouped).toEqual({});
  });

  test("uses index in callback", () => {
    const letters = ["a", "b", "c"];
    const grouped = groupBy(letters, (letter, index) =>
      index % 2 === 0 ? "even" : "odd",
    );
    expect(grouped).toEqual({
      even: ["a", "c"],
      odd: ["b"],
    });
  });

  test("works with Set", () => {
    const mySet = new Set(["apple", "banana", "apricot"]);
    const grouped = groupBy(mySet, (fruit) =>
      fruit.startsWith("a") ? "starts with a" : "other",
    );
    expect(grouped).toEqual({
      "starts with a": ["apple", "apricot"],
      other: ["banana"],
    });
  });

  test("returns an object", () => {
    const numbers = [1, 2, 3];
    const grouped = groupBy(numbers, (n) => n % 2);
    expect(typeof grouped).toBe("object");
    expect(grouped).toBeInstanceOf(Object);
  });
});

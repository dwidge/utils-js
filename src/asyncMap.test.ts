import { expect } from "expect";
import { describe, test } from "node:test";
import { asyncMap } from "./asyncMap.js";

describe("asyncMap", () => {
  test("maps an array of numbers asynchronously", async () => {
    const numbers = [1, 2, 3];
    const doubled = await asyncMap(numbers, async (n) => n * 2);
    expect(doubled).toEqual([2, 4, 6]);
  });

  test("executes asynchronous functions sequentially and maintains order", async () => {
    const logs: string[] = [];
    const items = ["a", "b", "c"];
    const result = await asyncMap(items, async (item, index) => {
      await new Promise((resolve) => setTimeout(resolve, 10 - index * 2)); // Simulate async delay
      logs.push(`Processed ${item} at index ${index}`);
      return `Processed ${item}`;
    });
    expect(logs).toEqual([
      "Processed a at index 0",
      "Processed b at index 1",
      "Processed c at index 2",
    ]);
    expect(result).toEqual(["Processed a", "Processed b", "Processed c"]);
  });

  test("handles an empty array", async () => {
    const emptyArray: number[] = [];
    const result = await asyncMap(emptyArray, async (n) => n * 2);
    expect(result).toEqual([]);
  });

  test("provides the correct index and array to the callback", async () => {
    const numbers = [10, 20, 30];
    const results = await asyncMap(numbers, async (num, index, array) => {
      expect(array).toEqual(numbers);
      return num + index;
    });
    expect(results).toEqual([10, 21, 32]);
  });

  test("works with promises that resolve to different types", async () => {
    const values = [1, "hello", true];
    const results = await asyncMap(values, async (value) => {
      return Promise.resolve(typeof value);
    });
    expect(results).toEqual(["number", "string", "boolean"]);
  });

  test("handles asynchronous functions that throw errors", async () => {
    const items = [1, 2, 3];
    await expect(
      asyncMap(items, async (item) => {
        if (item === 2) {
          throw new Error("Something went wrong");
        }
        return item * 2;
      }),
    ).rejects.toThrow("Something went wrong");
  });
});

// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export function assert(v: any, e?: string | Error): asserts v {
  if (!v) throw e instanceof Error ? e : new Error(e);
}

export const assertNotNull = <T>(value: T | null): T => {
  if (value === null)
    throw new Error("assertNotNullE1: Value cannot be null or undefined");
  return value;
};

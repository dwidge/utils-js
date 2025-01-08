// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const mergeObject = <A extends object, B extends object>(
  target: A,
  source: B
) => {
  Object.entries(source).forEach(([key, value]) => {
    if (value !== undefined && key in target) {
      target[key as keyof A] = value;
    }
  });
};

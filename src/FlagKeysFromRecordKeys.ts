// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export type FlagKeysFromRecordKeys<T extends Record<string, any>> = {
  [K in keyof T]?: boolean;
};

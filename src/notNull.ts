// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export const notNull = <T>(a: T | null | undefined): a is T => a != null;

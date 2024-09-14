// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { describe, test } from "node:test";
import { expect } from "expect";
import { formatDate } from "./formatDate.js";

describe.skip("formatDate", () => {
  const testDate = new Date("2024-06-12T12:34:56+02:00");

  test("should format date in US format without timezone", () => {
    const formatted = formatDate(testDate, null, "US");
    expect(formatted).toBe("06/12/2024 - 12:34 PM");
  });

  test("should format date in non-US format without timezone", () => {
    const formatted = formatDate(testDate, null, "FR");
    expect(formatted).toBe("2024-06-12 - 12:34 PM");
  });

  test("should format date in US format with timezone", () => {
    const formatted = formatDate(testDate, "America/New_York", "US");
    expect(formatted).toBe("06/12/2024 - 08:34 AM");
  });

  test("should format date in non-US format with timezone", () => {
    const formatted = formatDate(testDate, "Europe/Paris", "FR");
    expect(formatted).toBe("2024-06-12 - 14:34 PM");
  });

  test("should default to US format if country is null", () => {
    const formatted = formatDate(testDate, null, null);
    expect(formatted).toBe("06/12/2024 - 12:34 PM");
  });

  test("should handle invalid timezone gracefully", () => {
    const formatted = formatDate(testDate, "Invalid/Timezone", "US");
    // In case of invalid timezone, it should return the input date formatted in UTC
    expect(formatted).toBe("06/12/2024 - 12:34 PM");
  });
});

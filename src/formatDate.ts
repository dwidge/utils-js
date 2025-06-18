// Copyright DWJ 2024.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

import { assert } from "./assert.js";

// GPT4o

/**
 * Formats a given date into a locale-specific string with time, supporting optional time zone and country.
 *
 * - For US (`country` is "US" or not provided): returns in `MM/DD/YYYY - HH:MM AM/PM` format.
 * - For other countries: returns in `YYYY-MM-DD - HH:MM AM/PM` format.
 *
 * @param date - The date to format. Can be a `Date` object, string, number, or `null`/`undefined`.
 * @param timeZone - Optional IANA time zone string (e.g., "America/New_York"). If not provided, uses local time zone.
 * @param country - Optional country code (e.g., "US", "GB"). Defaults to "US".
 * @returns The formatted date string, or `undefined` if the input date is invalid or not provided.
 */
export const formatDate = (
  date: Date | string | number | null | undefined,
  timeZone?: string | null,
  country: string | null = "US",
): string | undefined => {
  if (!date) return;

  // Parse the date input
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return;

  // Set the locale based on the country
  const locale =
    !country || country?.toUpperCase() === "US" ? "en-US" : "en-GB";

  // Define the options for date and time formatting
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: timeZone || undefined,
  };

  // Format the date
  const formattedDate = new Intl.DateTimeFormat(locale, options).format(
    parsedDate,
  );

  // Modify the formatted date string to match the desired output
  // For US: MM/DD/YYYY - HH:mm a
  // For others: YYYY-MM-DD - HH:mm a
  const [datePart, timePart] = formattedDate.split(",");
  assert(datePart);
  let formattedString: string;
  if (locale === "en-US") {
    const [month, day, year] = datePart.split("/");
    formattedString = `${month}/${day}/${year.trim()} - ${timePart
      .trim()
      .toUpperCase()}`;
  } else {
    const [day, month, year] = datePart.split("/");
    formattedString = `${year}-${month}-${day} - ${timePart
      .trim()
      .toUpperCase()}`;
  }

  return formattedString;
};

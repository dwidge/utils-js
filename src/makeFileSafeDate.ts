import { formatDate } from "./formatDate.js";

export const makeFileSafeDate = (
  date: Date | string | number | null | undefined,
  timeZone?: string | null,
  country: string | null = "US",
) =>
  formatDate(date, timeZone, country)
    ?.replaceAll(":", ".")
    .replaceAll("/", ".")
    .split(" ")[0];

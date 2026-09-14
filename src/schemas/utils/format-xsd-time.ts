import { DateTime } from 'effect';

/**
 * @description Pads a number with leading zeros, preserving a leading `-` for negative values. Extracted from date-fns
 * `pkgs/core/src/_lib/addLeadingZeros/index.ts`.
 *
 * @param value - The number to pad.
 * @param targetLength - The total length the output should have.
 *
 * @returns The zero-padded string.
 */
const addLeadingZeros = (value: number, targetLength: number): string => {
  const sign = value < 0 ? '-' : '';
  return sign + Math.abs(value).toString().padStart(targetLength, '0');
};

/**
 * @description The `HH`, `mm` and `ss` tokens extracted from the date-fns `lightFormatters` (`pkgs/core/src/_lib/format/lightFormatters/index.ts`). The date-fns
 * implementation reads the local components of a `Date`; this port reads the UTC components because the caller hands it a `Date` whose UTC fields
 * already hold the wall-clock time of the target time zone.
 *
 * @param date - A `Date` whose UTC fields hold the wall-clock time to format.
 *
 * @returns The zero-padded `HH` component.
 */
const formatHours = (date: Date): string => addLeadingZeros(date.getUTCHours(), 2);

/**
 * @description See {@link formatHours}. Formats the `mm` token.
 *
 * @param date - A `Date` whose UTC fields hold the wall-clock time to format.
 *
 * @returns The zero-padded `mm` component.
 */
const formatMinutes = (date: Date): string => addLeadingZeros(date.getUTCMinutes(), 2);

/**
 * @description See {@link formatHours}. Formats the `ss` token. Fractional seconds are dropped because XSD `time` values produced by this library carry second
 * precision.
 *
 * @param date - A `Date` whose UTC fields hold the wall-clock time to format.
 *
 * @returns The zero-padded `ss` component.
 */
const formatSeconds = (date: Date): string => addLeadingZeros(date.getUTCSeconds(), 2);

/**
 * @description Formats a UTC offset as the ISO-8601 `XXX` token (`+HH:MM` / `-HH:MM`). The digit handling is extracted from date-fns `formatTimezone`
 * (`pkgs/core/src/_lib/format/formatters/index.ts`) with two deliberate differences:
 *
 * 1. The offset is expressed in the standard direction (positive means east of UTC) instead of JavaScript's inverted `Date#getTimezoneOffset` sign.
 * 2. A zero offset returns an empty string. date-fns renders it as `Z`; XSD `time` wants the time zone to be optional, so UTC produces no offset at all.
 *
 * @param offsetInMinutes - The offset east of UTC in minutes (for example `+05:30` is `330`).
 *
 * @returns The formatted offset, or an empty string for UTC.
 */
export const formatTimeZoneOffset = (offsetInMinutes: number): string => {
  if (offsetInMinutes === 0) return '';
  const sign = offsetInMinutes > 0 ? '+' : '-';
  const absoluteOffset = Math.abs(offsetInMinutes);
  const hours = addLeadingZeros(Math.trunc(absoluteOffset / 60), 2);
  const minutes = addLeadingZeros(absoluteOffset % 60, 2);
  return `${sign}${hours}:${minutes}`;
};

/**
 * @description Formats a `DateTime` as an XSD `time` lexical value: `HH:mm:ss` followed by an optional `±HH:MM` offset. The offset is omitted for UTC, so a UTC
 * value encodes as bare `HH:mm:ss` while a zoned value encodes as `HH:mm:ss±HH:MM`. Fractional seconds are intentionally dropped to match the second
 * precision the schema round-trips.
 *
 * @param date - The `DateTime` to format. It is rendered in its own time zone, not normalised to UTC.
 *
 * @returns The XSD `time` string.
 */
export const formatXsdTime = (date: DateTime.DateTime): string => {
  const wallClock = DateTime.toDate(date);
  const offsetInMinutes = (wallClock.getTime() - DateTime.toEpochMillis(date)) / (60 * 1000);
  return `${formatHours(wallClock)}:${formatMinutes(wallClock)}:${formatSeconds(wallClock)}${formatTimeZoneOffset(offsetInMinutes)}`;
};

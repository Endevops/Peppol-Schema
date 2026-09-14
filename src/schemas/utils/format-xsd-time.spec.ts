import { DateTime } from 'effect';
import { describe, expect, it } from 'vitest';

import { formatTimeZoneOffset, formatXsdTime } from './format-xsd-time.ts';

const offset = (minutes: number): DateTime.TimeZone => DateTime.zoneMakeOffset(minutes * 60 * 1000);

const zoned = (iso: string, offsetInMinutes: number): DateTime.Zoned => DateTime.makeZonedUnsafe(iso, { timeZone: offset(offsetInMinutes) });

describe('formatTimeZoneOffset', () => {
  it.each([
    [0, ''],
    [1, '+00:01'],
    [-1, '-00:01'],
    [60, '+01:00'],
    [-60, '-01:00'],
    [90, '+01:30'],
    [-90, '-01:30'],
    [330, '+05:30'],
    [-330, '-05:30'],
    [765, '+12:45'],
    [-765, '-12:45'],
    [1439, '+23:59'],
    [-1439, '-23:59'],
  ])('formats %i minutes east of UTC as %s', (minutes, expected) => {
    expect(formatTimeZoneOffset(minutes)).toBe(expected);
  });

  it('omits the offset for UTC so the timezone stays optional', () => {
    expect(formatTimeZoneOffset(0)).toBe('');
  });
});

describe('formatXsdTime', () => {
  describe('UTC', () => {
    it.each([
      ['2024-01-01T00:00:00.000Z', '00:00:00'],
      ['2024-06-15T14:30:45.123Z', '14:30:45'],
      ['2024-06-15T23:59:59.999Z', '23:59:59'],
      ['1970-01-01T12:00:00.000Z', '12:00:00'],
    ])('formats %s as %s without an offset', (iso, expected) => {
      expect(formatXsdTime(DateTime.makeUnsafe(iso))).toBe(expected);
    });

    it('omits the offset for a zero offset zone as well', () => {
      expect(formatXsdTime(zoned('2024-06-15T14:30:45.123Z', 0))).toBe('14:30:45');
    });
  });

  describe('fixed offsets', () => {
    it.each([
      ['2024-06-15T14:30:45.123Z', 180, '17:30:45+03:00'],
      ['2024-06-15T14:30:45.123Z', -480, '06:30:45-08:00'],
      ['2024-06-15T14:30:45.123Z', 330, '20:00:45+05:30'],
      ['2024-06-15T14:30:45.123Z', -210, '11:00:45-03:30'],
      ['2024-06-15T14:30:45.123Z', 60, '15:30:45+01:00'],
      ['2024-06-15T14:30:45.123Z', -60, '13:30:45-01:00'],
    ])('formats %s in offset %i as %s', (iso, offsetInMinutes, expected) => {
      expect(formatXsdTime(zoned(iso, offsetInMinutes))).toBe(expected);
    });

    it('carries the offset across a day boundary', () => {
      expect(formatXsdTime(zoned('2024-06-15T23:30:00.000Z', 60))).toBe('00:30:00+01:00');
    });

    it('truncates fractional seconds instead of rounding them', () => {
      expect(formatXsdTime(DateTime.makeUnsafe('2024-06-15T14:30:45.999Z'))).toBe('14:30:45');
    });
  });

  describe('named time zones', () => {
    it.each([
      ['2024-06-15T14:30:45.123Z', 'Europe/Paris', '16:30:45+02:00'],
      ['2024-01-15T14:30:45.123Z', 'Europe/Paris', '15:30:45+01:00'],
      ['2024-06-15T14:30:45.123Z', 'Asia/Kolkata', '20:00:45+05:30'],
      ['2024-06-15T14:30:45.123Z', 'UTC', '14:30:45'],
    ])('formats %s in %s as %s', (iso, timeZone, expected) => {
      expect(formatXsdTime(DateTime.makeZonedUnsafe(iso, { timeZone: DateTime.zoneMakeNamedUnsafe(timeZone) }))).toBe(expected);
    });
  });
});

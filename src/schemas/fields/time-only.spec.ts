import type { FormatOptions, ParseOptions } from 'date-fns';

import { tz } from '@date-fns/tz';
import { parse } from 'date-fns';
import { it, expect, describe } from 'vitest';
import * as z from 'zod/mini';

import { timeOnlyParser } from './time-only';

const dateFnsOptions = { in: tz('UTC') } as const satisfies ParseOptions & FormatOptions;

/**
 * @description Build a UTC Date for a given wall-clock time (no timezone shift).
 */
const createTime = (hours: number, minutes: number, seconds: number) =>
  parse(
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    'HH:mm:ss',
    new Date(),
    dateFnsOptions
  );

describe(`${timeOnlyParser.name}()`, () => {
  /**
   * @description Encode: XSD time string -> Date. Offsets other than Z / +00:00 shift the resulting UTC instant: '10:12:45-05:30' => 15:42:45 UTC '00:00:00+01:00'
   * => 23:00:00 UTC (previous calendar day) Cases whose offset changes the calendar date are asserted on UTC time components only to stay independent
   * of "today"'s date.
   */
  describe('encode', () => {
    it.each([
      ['10:10:00Z', createTime(10, 10, 0)],
      ['12:00:00Z', createTime(12, 0, 0)],
      ['00:00:00Z', createTime(0, 0, 0)],
      ['23:59:59Z', createTime(23, 59, 59)],
      // +00:00 is equivalent to Z
      ['10:10:00+00:00', createTime(10, 10, 0)],
      // non-UTC offset that stays within the same calendar day
      ['10:12:45-05:30', createTime(15, 42, 45)],
    ] as const)('should encode %s', (input, expected) => {
      expect(z.encode(timeOnlyParser(), input)).toEqual(expected);
    });

    it('should encode 00:00:00+01:00 to 23:00:00 UTC (previous day)', () => {
      const result = z.encode(timeOnlyParser(), '00:00:00+01:00');
      expect(result.getUTCHours()).toBe(23);
      expect(result.getUTCMinutes()).toBe(0);
      expect(result.getUTCSeconds()).toBe(0);
    });
  });

  /**
   * @description Decode: Date -> XSD time string. The codec always emits UTC, so the output always ends with 'Z'.
   */
  describe('decode', () => {
    it.each([
      [createTime(10, 10, 0), '10:10:00Z'],
      [createTime(12, 0, 0), '12:00:00Z'],
      [createTime(0, 0, 0), '00:00:00Z'],
      [createTime(23, 59, 59), '23:59:59Z'],
    ] as const)('should decode to %s', (input, expected) => {
      expect(z.decode(timeOnlyParser(), input)).toEqual(expected);
    });
  });

  /**
   * @description Encode edge cases: fractional seconds and extreme offsets. Note: date-fns HH:mm:ssXXX format does NOT support fractional seconds. These tests
   * verify that the codec throws/returns invalid Date for these cases.
   */
  describe('encode edge cases', () => {
    it('should throw on fractional seconds (12:30:45.5) - not supported by HH:mm:ssXXX', () => {
      // date-fns HH:mm:ssXXX does NOT support fractional seconds
      expect(() => z.encode(timeOnlyParser(), '12:30:45.5')).toThrow();
    });

    it('should throw on many fractional digits (12:30:45.123456789) - not supported', () => {
      expect(() => z.encode(timeOnlyParser(), '12:30:45.123456789')).toThrow();
    });

    it('should encode maximum positive offset (+14:00)', () => {
      const result = z.encode(timeOnlyParser(), '00:00:00+14:00');
      expect(result.getUTCHours()).toBe(10);
      expect(result.getUTCMinutes()).toBe(0);
      expect(result.getUTCSeconds()).toBe(0);
    });

    it('should encode maximum negative offset (-14:00)', () => {
      const result = z.encode(timeOnlyParser(), '00:00:00-14:00');
      expect(result.getUTCHours()).toBe(14);
      expect(result.getUTCMinutes()).toBe(0);
      expect(result.getUTCSeconds()).toBe(0);
    });

    it('should encode max time with max offset (23:59:59+23:59)', () => {
      const result = z.encode(timeOnlyParser(), '23:59:59+23:59');
      expect(result.getUTCHours()).toBe(0);
      expect(result.getUTCMinutes()).toBe(0);
      expect(result.getUTCSeconds()).toBe(59);
    });

    it('should encode middle of day with Z (14:30:00Z)', () => {
      const result = z.encode(timeOnlyParser(), '14:30:00Z');
      expect(result.getUTCHours()).toBe(14);
      expect(result.getUTCMinutes()).toBe(30);
      expect(result.getUTCSeconds()).toBe(0);
    });
  });

  /**
   * @description Encode invalid cases: should throw or return invalid Date.
   */
  describe('encode invalid cases', () => {
    it('should throw on hour out of range (25:00:00)', () => {
      expect(() => z.encode(timeOnlyParser(), '25:00:00')).toThrow();
    });

    it('should throw on 24:00:00 (ISO 8601 end-of-day not supported)', () => {
      expect(() => z.encode(timeOnlyParser(), '24:00:00')).toThrow();
    });

    it('should throw on minutes out of range (12:60:00)', () => {
      expect(() => z.encode(timeOnlyParser(), '12:60:00')).toThrow();
    });

    it('should throw on seconds out of range (12:30:60) - leap seconds', () => {
      expect(() => z.encode(timeOnlyParser(), '12:30:60')).toThrow();
    });

    it('should throw on compact timezone without colon (+0100)', () => {
      // date-fns HH:mm:ssXXX does NOT support compact timezone format
      expect(() => z.encode(timeOnlyParser(), '12:30:45+0100')).toThrow();
    });

    it('should throw on compact timezone without colon (-0530)', () => {
      expect(() => z.encode(timeOnlyParser(), '12:30:45-0530')).toThrow();
    });

    it('should throw on negative time (-01:00:00)', () => {
      expect(() => z.encode(timeOnlyParser(), '-01:00:00')).toThrow();
    });

    it('should throw on 24:00:00Z (end-of-day with Z)', () => {
      expect(() => z.encode(timeOnlyParser(), '24:00:00Z')).toThrow();
    });

    it('should throw on missing seconds (12:30)', () => {
      expect(() => z.encode(timeOnlyParser(), '12:30')).toThrow();
    });

    it('should throw on empty string', () => {
      expect(() => z.encode(timeOnlyParser(), '')).toThrow();
    });
  });

  /**
   * @description Decode edge cases. Note: The codec wrapper validates input as Date before calling the decode function. The decode implementation has pass-through
   * logic for strings, but Zod validation blocks it. These tests verify that passing a string directly throws.
   */
  describe('decode edge cases', () => {
    it('should throw when passing string directly to decode (z.codec validates input)', () => {
      // The z.codec wrapper validates input is a Date before calling decode,
      // so passing a string directly throws "expected date, received string"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => z.decode(timeOnlyParser(), 'any string' as any)).toThrow();
    });

    it('should throw when passing non-time string directly', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => z.decode(timeOnlyParser(), 'not a time' as any)).toThrow();
    });

    it('should throw when passing empty string directly', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => z.decode(timeOnlyParser(), '' as any)).toThrow();
    });
  });

  /**
   * @description Roundtrip: encode then decode must return canonical Z form.
   */
  describe('roundtrip', () => {
    it.each(['00:00:00Z', '10:10:00Z', '23:59:59Z'] as const)('encode -> decode of %s returns the same string', xsdTime => {
      const encoded = z.encode(timeOnlyParser(), xsdTime);
      expect(z.decode(timeOnlyParser(), encoded)).toBe(xsdTime);
    });

    it('should throw on roundtrip with fractional seconds (not supported)', () => {
      // Fractional seconds are not supported by HH:mm:ssXXX format
      expect(() => z.encode(timeOnlyParser(), '12:30:45.5Z')).toThrow();
    });
  });

  // The `typeof value === 'string' ? value : format(...)` pass-through branch of
  // the decode transform is unreachable through `z.decode` (input is validated as
  // a Date first), so exercise the transform function directly.
  describe('decode transform (string pass-through branch)', () => {
    it('passes string values through untouched', () => {
      const codec = timeOnlyParser() as unknown as { _zod: { def: { transform: (value: unknown) => string } } };
      expect(codec._zod.def.transform('10:10:00Z')).toBe('10:10:00Z');
    });
  });
});

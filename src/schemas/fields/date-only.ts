import { tz } from '@date-fns/tz';
import type { FormatOptions, ParseOptions } from 'date-fns';
import { format, parse } from 'date-fns';
import * as z from 'zod/mini';

const dateFnsOptions = { in: tz('UTC') } as const satisfies ParseOptions & FormatOptions;

/**
 * @description Reusable YYYY-MM-DD date validator. Accepts either a string in the format 'YYYY-MM-DD' or a Date object.
 *
 * @validation PEPPOL-EN16931-F001: A date MUST be formatted YYYY-MM-DD.
 */
export function dateOnly(error?: string) {
  return z.iso.date(error);
}
dateOnly.error = 'PEPPOL-EN16931-F001: A date MUST be formatted YYYY-MM-DD.';

/**
 * @description Parser function for date-only values.
 */
export function dateOnlyParser() {
  return z.codec(z.date(), z.iso.date(dateOnly.error), {
    decode(value) {
      return typeof value === 'string' ? value : format(value, 'yyyy-MM-dd', dateFnsOptions);
    },
    encode(value) {
      return parse(value, 'yyyy-MM-dd', new Date(), dateFnsOptions);
    },
  });
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  const createDate = (year: number, month: number, day: number) =>
    parse(
      `${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      'yyyy-MM-dd',
      new Date(),
      dateFnsOptions
    );

  describe(`${dateOnly.name}()`, () => {
    const dates = [
      ['2024-06-15', '2024-06-15'],
      ['1999-12-31', '1999-12-31'],
      ['2000-01-01', '2000-01-01'],
    ] as const;

    it.each(dates)('should decode %s to %s', (input, expected) => {
      expect(z.decode(dateOnly(), input)).toEqual(expected);
    });

    it.each(dates)('should encode %s to %s', (expected, input) => {
      expect(z.encode(dateOnly(), input)).toEqual(expected);
    });
  });

  describe(`${dateOnlyParser.name}()`, () => {
    const dates = [
      ['2024-06-15', createDate(2024, 6, 15)],
      ['1999-12-31', createDate(1999, 12, 31)],
      ['2000-01-01', createDate(2000, 1, 1)],
    ] as const;

    it.each(dates)('should encode %s to %s', (input, expected) => {
      expect(z.encode(dateOnlyParser(), input)).toEqual(expected);
    });

    it.each(dates)('should decode %s to %s', (expected, input) => {
      expect(z.decode(dateOnlyParser(), input)).toEqual(expected);
    });
  });
}

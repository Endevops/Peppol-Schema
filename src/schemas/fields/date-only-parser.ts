import type { FormatOptions, ParseOptions } from 'date-fns';

import { tz } from '@date-fns/tz';
import { format, parse } from 'date-fns';
import * as z from 'zod/mini';

import { dateOnly } from '#/schemas/fields/date-only-fn';

const dateFnsOptions = { in: tz('UTC') } as const satisfies ParseOptions & FormatOptions;

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

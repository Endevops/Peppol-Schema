import type { FormatOptions, ParseOptions } from 'date-fns';

import { tz } from '@date-fns/tz';
import { parse } from 'date-fns';
import { describe, expect, it } from 'vitest';
import * as z from 'zod/mini';

import { dateOnlyParser } from './date-only-parser';

const dateFnsOptions = { in: tz('UTC') } as const satisfies ParseOptions & FormatOptions;

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

  // The `typeof value === 'string' ? value : format(...)` pass-through branch of
  // the decode transform is unreachable through `z.decode` (input is validated as
  // a Date first), so exercise the transform function directly.
  describe('decode transform (string pass-through branch)', () => {
    it('passes string values through untouched', () => {
      const codec = dateOnlyParser() as unknown as { _zod: { def: { transform: (value: unknown) => string } } };
      expect(codec._zod.def.transform('2024-06-15')).toBe('2024-06-15');
    });
  });
});

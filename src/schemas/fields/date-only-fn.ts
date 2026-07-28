import * as z from 'zod/mini';

export function dateOnly(error?: string) {
  return z.iso.date(error);
}
dateOnly.error = 'PEPPOL-EN16931-F001: A date MUST be formatted YYYY-MM-DD.';

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

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
}

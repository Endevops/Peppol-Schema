import * as z from 'zod/mini';

export function dateOnly(error?: string) {
  return z.iso.date(error);
}
dateOnly.error = 'PEPPOL-EN16931-F001: A date MUST be formatted YYYY-MM-DD.';

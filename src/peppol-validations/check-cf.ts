import { checkCF16 } from './check-cf16.ts';
import { normalizeSpace } from './normalize-space.ts';

/**
 * @description Validates both 16 and 11 character Italian fiscal codes.
 *
 * @example
 *   ```ts
 *   checkCF('RSSMRA80A01H501U'); // true
 *   ```;
 *
 * @param arg - The fiscal code to validate. Whitespace is normalised first.
 *
 * @returns `true` when the normalised code is a valid 16 character personal fiscal code or an 11 digit VAT code, otherwise `false`.
 *
 * @see {@link checkCF16}
 */
export function checkCF(arg: string): boolean {
  const s = normalizeSpace(arg);
  if (s.length === 16) return checkCF16(s);
  if (s.length === 11) return /^\d{11}$/.test(s);
  return false;
}

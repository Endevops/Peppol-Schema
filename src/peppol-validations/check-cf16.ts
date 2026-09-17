import { normalizeSpace } from './normalize-space.ts';

/**
 * @description Validates 16-character Italian fiscal codes.
 *
 * @example
 *   ```ts
 *   checkCF16('RSSMRA80A01H501U'); // true
 *   ```;
 *
 * @param arg - The fiscal code to validate. Whitespace is normalised first.
 *
 * @returns `true` when the normalised code is 16 characters and matches `{6 letters}{2 digits}{letter}{2 digits}{letter}{3 digits}{letter}`,
 *   otherwise `false`.
 *
 * @see {@link checkCF}
 */
export function checkCF16(arg: string): boolean {
  const s = normalizeSpace(arg);
  if (s.length !== 16) return false;
  if (!/^[A-Za-z]{6}\d{2}[A-Za-z]\d{2}[A-Za-z]\d{3}[A-Za-z]$/.test(s)) return false;
  return true;
}

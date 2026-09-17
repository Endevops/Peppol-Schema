import { normalizeSpace } from './normalize-space.ts';

/**
 * @description Belgian enterprise number validation (mod 97-0208)
 *
 * @example
 *   ```ts
 *   isValidMod97_0208('0123456749'); // { success: true }
 *   ```;
 *
 * @param val - The enterprise number to validate. Whitespace is normalised first.
 *
 * @returns `{ success: true }` when the last two digits equal `97 - (first eight digits % 97)`, otherwise `{ success: false, expected, actual }` with
 *   the computed and supplied check digits.
 */
export function isValidMod97_0208(val: string): { success: true } | { success: false; expected: number; actual: number } {
  const s = normalizeSpace(val);
  const checkdigits = Number(s.substring(8, 10));
  const main = Number(s.substring(0, 8));
  const calculated = 97 - (main % 97);
  const success = checkdigits === calculated;
  if (success) {
    return { success: true };
  }
  return { actual: checkdigits, expected: calculated, success: false };
}

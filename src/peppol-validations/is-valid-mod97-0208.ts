import { normalizeSpace } from './normalize-space';

/**
 * @description Belgian enterprise number validation (mod 97-0208)
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

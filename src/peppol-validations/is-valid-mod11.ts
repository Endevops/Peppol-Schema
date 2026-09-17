import { normalizeSpace } from './normalize-space.ts';

/**
 * @description Validates Norwegian organization numbers using mod11 algorithm.
 *
 * @example
 *   ```ts
 *   isValidMod11('923609016'); // true
 *   ```;
 *
 * @param val - The organization number to validate. Whitespace is normalised first.
 *
 * @returns `true` when the normalised value is at least two digits and its mod 11 check digit matches, otherwise `false`.
 */
export function isValidMod11(val: string): boolean {
  const s = normalizeSpace(val);
  if (!/^\d+$/.test(s) || s.length < 2) return false;
  const length = s.length - 1;
  let weightedSum = 0;
  // weights 2..7 repeated
  for (let i = 0; i < length; i += 1) {
    const digit = s.charCodeAt(length - 1 - i) - 48; // reverse to match XSLT reverse
    const weight = (i % 6) + 2;
    weightedSum += digit * weight;
  }
  const check = (11 - (weightedSum % 11)) % 11;
  return check === Number(s[length]);
}

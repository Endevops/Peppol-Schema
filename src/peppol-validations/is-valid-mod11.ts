import { normalizeSpace } from './normalize-space';

/**
 * @description Validates Norwegian organization numbers using mod11 algorithm.
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

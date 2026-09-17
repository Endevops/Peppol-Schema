import { normalizeSpace } from './normalize-space.ts';

/**
 * @description Australian Business Number (ABN) validation.
 *
 * @example
 *   ```ts
 *   isValidABN('51 824 753 556'); // true
 *   ```;
 *
 * @param val - The ABN to validate. Whitespace is normalised first.
 *
 * @returns `true` when the normalised value is 11 digits and the weighted checksum is divisible by 89, otherwise `false`.
 */
export function isValidABN(val: string): boolean {
  const s = normalizeSpace(val);
  if (!/^\d{11}$/.test(s)) return false;
  const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  let sum = (s.charCodeAt(0) - 49) * 10; // (first digit -1)*10
  for (let i = 1; i < 11; i += 1) {
    sum += (s.charCodeAt(i) - 48) * weights[i]!;
  }
  return sum % 89 === 0;
}

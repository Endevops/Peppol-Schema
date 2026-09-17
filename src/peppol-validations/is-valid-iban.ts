import { normalizeSpace } from './normalize-space.ts';

/**
 * @description IBAN validation using mod 97 algorithm.
 *
 * @example
 *   ```ts
 *   isValidIBAN('GB82 WEST 1234 5698 7654 32'); // true
 *   ```;
 *
 * @param iban - The IBAN to validate, with or without spaces.
 *
 * @returns `true` when the normalised value matches the `{2 letters}{2 digits}{up to 30 alphanumerics}` shape and its mod 97 remainder is 1,
 *   otherwise `false`.
 */
export function isValidIBAN(iban: string): boolean {
  const s = normalizeSpace(iban).replace(/[ \t\r\n]/g, '');
  if (!/^[A-Z]{2}\d{2}[A-Za-z0-9]{0,30}$/.test(s)) return false;
  const rearranged = s.slice(4) + s.slice(0, 4);
  const converted = rearranged
    .split('')
    .map(ch => {
      const code = ch.charCodeAt(0);
      // A=10..Z=35, digits 0..9
      return code >= 65 && code <= 90 ? String(code - 55) : ch;
    })
    .join('');
  // mod 97 calculation on big integer string
  let remainder = 0;
  for (const c of converted) {
    remainder = (remainder * 10 + (c.charCodeAt(0) - 48)) % 97;
  }
  return remainder === 1;
}

import { normalizeSpace } from './normalize-space';

/**
 * @description IBAN validation using mod 97 algorithm.
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

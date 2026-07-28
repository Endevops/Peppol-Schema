import { normalizeSpace } from './normalize-space';

/**
 * @description Validates Swedish organization numbers (0007)
 */
export function checkSEOrgnr(number: string): boolean {
  const s = normalizeSpace(number);
  if (!/^\d+$/.test(s) || s.length !== 10) return false;
  const main = s.substring(0, 9);
  const checkDigit = Number(s[9]);
  let sum = 0;
  for (let pos = 1; pos <= main.length; pos += 1) {
    const digit = Number(main[main.length - pos]);
    if (pos % 2 === 1) {
      const dbl = ((digit * 2) % 10) + Math.floor((digit * 2) / 10);
      sum += dbl;
    } else {
      sum += digit;
    }
  }
  const calculated = (10 - (sum % 10)) % 10;
  return calculated === checkDigit;
}

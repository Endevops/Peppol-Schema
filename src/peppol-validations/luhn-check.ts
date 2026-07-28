import { normalizeSpace } from './normalize-space';

/**
 * @description Luhn algorithm check (used for credit card validation)
 */
export function luhnCheck(number: string): boolean {
  const s = normalizeSpace(number);
  if (!/^\d+$/.test(s)) return false;
  let sum = 0;
  let dbl = false;
  for (let i = s.length - 1; i >= 0; i -= 1) {
    let n = s.charCodeAt(i) - 48;
    if (dbl) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

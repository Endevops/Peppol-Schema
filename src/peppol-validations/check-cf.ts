import { checkCF16 } from './check-cf16';
import { normalizeSpace } from './normalize-space';

/**
 * @description Validates both 16 and 11 character Italian fiscal codes.
 */
export function checkCF(arg: string): boolean {
  const s = normalizeSpace(arg);
  if (s.length === 16) return checkCF16(s);
  if (s.length === 11) return /^\d{11}$/.test(s);
  return false;
}

import { normalizeSpace } from './normalize-space';

/**
 * @description Validates 16-character Italian fiscal codes.
 */
export function checkCF16(arg: string): boolean {
  const s = normalizeSpace(arg);
  if (s.length !== 16) return false;
  if (!/^[A-Za-z]{6}\d{2}[A-Za-z]\d{2}[A-Za-z]\d{3}[A-Za-z]$/.test(s)) return false;
  return true;
}

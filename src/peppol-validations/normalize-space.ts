/**
 * @description Normalize whitespace in a string by replacing multiple whitespace characters with a single space and trimming.
 */
export function normalizeSpace(input: string): string {
  const s = typeof input === 'string' ? input : input == null ? '' : String(input);
  return s.replace(/\s+/g, ' ').trim();
}

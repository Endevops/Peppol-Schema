/**
 * @description [GLN](https://en.wikipedia.org/wiki/Global_Location_Number) check (GS1)
 */
export function isValidGLN(val: string): { success: true } | { success: false; expected: number; actual: number } {
  const value = (val ?? '').replace(/\s+/g, '');
  const len = value.length - 1;

  const digits = value
    .slice(0, len)
    .split('')
    .map(c => c.charCodeAt(0) - 48)
    .reverse();

  const weightedSum = digits.reduce((sum, d, i) => sum + d * (1 + ((i + 1) % 2) * 2), 0);
  const check = (10 - (weightedSum % 10)) % 10;
  const success = check === Number(value[len]);
  if (success) {
    return { success: true };
  }
  return { actual: Number(value[len]), expected: check, success: false };
}

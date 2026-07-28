/**
 * @description Greek TIN verification.
 */
export function greekTinVerification(val: string): boolean {
  if (!/^\d{9}$/.test(val)) return false;
  const digits = val.split('').map(Number) as [number, number, number, number, number, number, number, number, number];
  const checksum =
    digits[7] * 2 + digits[6] * 4 + digits[5] * 8 + digits[4] * 16 + digits[3] * 32 + digits[2] * 64 + digits[1] * 128 + digits[0] * 256;

  return (checksum % 11) % 10 === digits[8];
}

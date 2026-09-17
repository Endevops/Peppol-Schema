import { addPIVA } from './add-piva.ts';

/**
 * @description Validates Italian VAT numbers (PIVA)
 *
 * @example
 *   ```ts
 *   checkPIVA('00743110157'); // 0
 *   ```;
 *
 * @param arg - The Italian VAT number without the `IT` prefix.
 *
 * @returns `0` when valid, otherwise the non-zero remainder of {@link addPIVA}, or `1` when `arg` contains a non-digit.
 *
 * @see {@link addPIVA}
 */
export function checkPIVA(arg: string): number {
  if (!/^\d+$/.test(arg)) return 1;
  return addPIVA(arg, 0) % 10;
}

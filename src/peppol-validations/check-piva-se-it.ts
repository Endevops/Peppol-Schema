import { checkPIVA } from './check-piva.ts';

/**
 * @description Validates Italian VAT numbers with IT prefix.
 *
 * @example
 *   ```ts
 *   checkPIVAseIT('IT00743110157'); // true
 *   ```;
 *
 * @param arg - The VAT identifier including its two letter country prefix.
 *
 * @returns `true` when the prefix is not `IT`, or when the 11 digit Italian part passes {@link checkPIVA}; otherwise `false`.
 *
 * @see {@link checkPIVA}
 */
export function checkPIVAseIT(arg: string): boolean {
  const paese = arg.substring(0, 2);
  const codice = arg.substring(2);
  if (paese.toUpperCase() !== 'IT') return true;
  return codice.length === 11 && checkPIVA(codice) === 0;
}

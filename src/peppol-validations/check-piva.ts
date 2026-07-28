import { addPIVA } from './add-piva';

/**
 * @description Validates Italian VAT numbers (PIVA)
 */
export function checkPIVA(arg: string): number {
  if (!/^\d+$/.test(arg)) return 1;
  return addPIVA(arg, 0) % 10;
}

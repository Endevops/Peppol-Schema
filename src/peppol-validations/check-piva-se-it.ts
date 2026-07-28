import { checkPIVA } from './check-piva';

/**
 * @description Validates Italian VAT numbers with IT prefix.
 */
export function checkPIVAseIT(arg: string): boolean {
  const paese = arg.substring(0, 2);
  const codice = arg.substring(2);
  if (paese.toUpperCase() !== 'IT') return true;
  return codice.length === 11 && checkPIVA(codice) === 0;
}

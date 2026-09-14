import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-06',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Document level charge base amount (BT-100) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec06(document: PeppolDocument): boolean {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => ac.chargeIndicator)
    .every(ac => !ac.baseAmount || hasMaxTwoDecimals(ac.baseAmount.value));
  return passed;
}

export const validateCenEn16931BrDec06 = schematronRule(rule, evaluateCenEn16931BrDec06);

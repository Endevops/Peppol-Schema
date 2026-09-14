import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-DEC-05',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Document level charge amount (BT-99) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec05(document: PeppolDocument): boolean {
  const passed = (document.allowanceCharges ?? []).filter(ac => ac.chargeIndicator).every(ac => !ac.amount || hasMaxTwoDecimals(ac.amount.value));
  return passed;
}

export const validateCenEn16931BrDec05 = schematronRule(rule, evaluateCenEn16931BrDec05);

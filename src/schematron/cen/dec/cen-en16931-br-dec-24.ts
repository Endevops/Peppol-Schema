import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-24',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice line allowance amount (BT-136) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec24(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? []).filter(ac => !ac.chargeIndicator).every(ac => !ac.amount || hasMaxTwoDecimals(ac.amount.value))
  );
  return passed;
}

export const validateCenEn16931BrDec24 = schematronRule(rule, evaluateCenEn16931BrDec24);

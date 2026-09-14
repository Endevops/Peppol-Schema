import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-DEC-28',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice line charge base amount (BT-142) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec28(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? []).filter(ac => ac.chargeIndicator).every(ac => !ac.baseAmount || hasMaxTwoDecimals(ac.baseAmount.value))
  );
  return passed;
}

export const validateCenEn16931BrDec28 = schematronRule(rule, evaluateCenEn16931BrDec28);

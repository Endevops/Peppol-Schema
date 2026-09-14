import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-DEC-23',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice line net amount (BT-131) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec23(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => hasMaxTwoDecimals(line.lineExtensionAmount.value));
  return passed;
}

export const validateCenEn16931BrDec23 = schematronRule(rule, evaluateCenEn16931BrDec23);

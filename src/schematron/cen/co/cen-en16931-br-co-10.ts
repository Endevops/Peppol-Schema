import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, getLines, round2, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-10',
  level: 'fatal',
  message: 'Sum of Invoice line net amount (BT-106) = Σ Invoice line net amount (BT-131).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo10(document: PeppolDocument): boolean {
  const passed = amountsEqual(
    round2(document.legalMonetaryTotal.lineExtensionAmount.value),
    round2(getLines(document).reduce((sum, line) => sum + line.lineExtensionAmount.value, 0))
  );
  return passed;
}

export const validateCenEn16931BrCo10 = schematronRule(rule, evaluateCenEn16931BrCo10);

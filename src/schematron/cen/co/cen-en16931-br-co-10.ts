import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { amountsEqual, getLines, round2, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-10',
  level: 'fatal',
  message: 'Sum of Invoice line net amount (BT-106) = Σ Invoice line net amount (BT-131).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo10(document: PeppolDocument): SchematronRuleResult {
  const passed = amountsEqual(
    round2(document.legalMonetaryTotal.lineExtensionAmount.value),
    round2(getLines(document).reduce((sum, line) => sum + line.lineExtensionAmount.value, 0))
  );
  return schematronResult(rule, passed);
}

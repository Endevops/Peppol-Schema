import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, hasMaxTwoDecimals, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-23',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice line net amount (BT-131) is 2.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrDec23(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => hasMaxTwoDecimals(line.lineExtensionAmount.value));
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-16',
  level: 'fatal',
  message: 'An Invoice shall have at least one Invoice line (BG-25)',
} as const satisfies SchematronRule;

export function validateCenEn16931Br16(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).length > 0;
  return schematronResult(rule, passed);
}

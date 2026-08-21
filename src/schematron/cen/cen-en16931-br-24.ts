import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-24',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall have an Invoice line net amount (BT-131).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br24(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => typeof line.lineExtensionAmount === 'object' && line.lineExtensionAmount !== null);
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-21',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall have an Invoice line identifier (BT-126).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br21(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => typeof line.id === 'string' && line.id.trim() !== '');
  return schematronResult(rule, passed);
}

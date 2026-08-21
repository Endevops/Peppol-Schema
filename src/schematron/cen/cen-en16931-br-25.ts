import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-25',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall contain the Item name (BT-153).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br25(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => typeof line.item.name === 'string' && line.item.name.trim() !== '');
  return schematronResult(rule, passed);
}

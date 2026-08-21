import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-64',
  level: 'fatal',
  message: 'The Item standard identifier (BT-157) shall have a Scheme identifier.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br64(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(
    line => !line.item.standardItemIdentification || typeof line.item.standardItemIdentification.id.schemeId === 'string'
  );
  return schematronResult(rule, passed);
}

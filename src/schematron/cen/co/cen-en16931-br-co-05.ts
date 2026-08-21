import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-05',
  level: 'fatal',
  message: 'Document level allowance reason code (BT-98) and Document level allowance reason (BT-97) shall indicate the same type of allowance.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo05(document: PeppolDocument): SchematronRuleResult {
  void document;
  return schematronResult(rule, true);
}

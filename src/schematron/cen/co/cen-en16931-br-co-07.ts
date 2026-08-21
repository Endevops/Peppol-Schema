import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-07',
  level: 'fatal',
  message: 'Invoice line allowance reason code (BT-140) and Invoice line allowance reason (BT-139) shall indicate the same type of allowance reason.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo07(document: PeppolDocument): SchematronRuleResult {
  void document;
  return schematronResult(rule, true);
}

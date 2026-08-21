import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-08',
  level: 'fatal',
  message: 'Invoice line charge reason code (BT-145) and Invoice line charge reason (BT-144) shall indicate the same type of charge reason.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo08(document: PeppolDocument): SchematronRuleResult {
  void document;
  return schematronResult(rule, true);
}

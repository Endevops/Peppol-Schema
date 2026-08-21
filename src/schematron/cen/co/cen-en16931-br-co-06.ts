import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-06',
  level: 'fatal',
  message: 'Document level charge reason code (BT-105) and Document level charge reason (BT-104) shall indicate the same type of charge.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo06(document: PeppolDocument): SchematronRuleResult {
  void document;
  return schematronResult(rule, true);
}

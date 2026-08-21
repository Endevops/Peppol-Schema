import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-49',
  level: 'fatal',
  message: 'A Payment instruction (BG-16) shall specify the Payment means type code (BT-81).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br49(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.paymentMeans ?? []).every(pm => typeof pm.paymentMeansCode?.code === 'string' && pm.paymentMeansCode.code.trim() !== '');
  return schematronResult(rule, passed);
}

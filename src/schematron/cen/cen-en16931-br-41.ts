import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-41',
  level: 'fatal',
  message: 'Each Invoice line allowance (BG-27) shall have an Invoice line allowance amount (BT-136).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br41(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? []).filter(ac => !ac.chargeIndicator).every(ac => typeof ac.amount === 'object' && ac.amount !== null)
  );
  return schematronResult(rule, passed);
}

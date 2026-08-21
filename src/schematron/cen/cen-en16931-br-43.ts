import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-43',
  level: 'fatal',
  message: 'Each Invoice line charge (BG-28) shall have an Invoice line charge amount (BT-141).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br43(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? []).filter(ac => ac.chargeIndicator).every(ac => typeof ac.amount === 'object' && ac.amount !== null)
  );
  return schematronResult(rule, passed);
}

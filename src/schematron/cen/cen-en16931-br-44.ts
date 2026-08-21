import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-44',
  level: 'fatal',
  message: 'Each Invoice line charge shall have an Invoice line charge reason or an invoice line allowance reason code.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br44(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? [])
      .filter(ac => ac.chargeIndicator)
      .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string')
  );
  return schematronResult(rule, passed);
}

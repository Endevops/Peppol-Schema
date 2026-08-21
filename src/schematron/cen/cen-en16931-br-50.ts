import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-50',
  level: 'fatal',
  message: 'A Payment account identifier (BT-84) shall be present if Credit transfer (BG-17) information is provided in the Invoice.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br50(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.paymentMeans ?? []).every(
    pm =>
      (pm.paymentMeansCode?.code !== '30' && pm.paymentMeansCode?.code !== '58') ||
      (typeof pm.payeeFinancialAccount?.id === 'string' && pm.payeeFinancialAccount.id.trim() !== '')
  );
  return schematronResult(rule, passed);
}

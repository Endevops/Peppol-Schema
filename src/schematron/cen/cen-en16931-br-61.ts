import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-61',
  level: 'fatal',
  message:
    'If the Payment means type code (BT-81) means SEPA credit transfer, Local credit transfer or Non-SEPA international credit transfer, the Payment account identifier (BT-84) shall be present.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br61(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.paymentMeans ?? []).every(
    pm =>
      (pm.paymentMeansCode?.code !== '30' && pm.paymentMeansCode?.code !== '58') ||
      (typeof pm.payeeFinancialAccount?.id === 'string' && pm.payeeFinancialAccount.id.trim() !== '')
  );
  return schematronResult(rule, passed);
}

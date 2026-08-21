import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R061',
  level: 'fatal',
  message: 'Mandate reference MUST be provided for direct debit.',
} as const satisfies SchematronRule;

const DIRECT_DEBIT_CODES = new Set(['49', '59']);

export function validatePeppolEn16931R061(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!DIRECT_DEBIT_CODES.has(payment.paymentMeansCode.code)) {
      return true;
    }
    const mandateId = payment.paymentMandate?.id;
    return typeof mandateId === 'string' && mandateId.trim() !== '';
  });
  return schematronResult(rule, passed);
}

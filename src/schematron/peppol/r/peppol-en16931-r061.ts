import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R061',
  level: 'fatal',
  message: 'Mandate reference MUST be provided for direct debit.',
} as const satisfies SchematronRule;

const DIRECT_DEBIT_CODES = new Set(['49', '59']);

function evaluatePeppolEn16931R061(document: PeppolDocument): boolean {
  const passed = (document.paymentMeans ?? []).every(payment => {
    if (!DIRECT_DEBIT_CODES.has(payment.paymentMeansCode.code)) {
      return true;
    }
    const mandateId = payment.paymentMandate?.id;
    return typeof mandateId === 'string' && mandateId.trim() !== '';
  });
  return passed;
}

export const validatePeppolEn16931R061 = schematronRule(rule, evaluatePeppolEn16931R061);

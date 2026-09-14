import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DK-R-005',
  level: 'fatal',
  message: 'For Danish suppliers the following Payment means codes are allowed: 1, 10, 31, 42, 48, 49, 50, 58, 59, 93 and 97',
} as const satisfies SchematronRule;

const ALLOWED_CODES = new Set(['1', '10', '31', '42', '48', '49', '50', '58', '59', '93', '97']);

function evaluateDkR005(document: PeppolDocument): boolean {
  if (!isDanishSupplierAndCustomer(document)) {
    return true;
  }
  const passed = (document.paymentMeans ?? []).every(payment => ALLOWED_CODES.has(payment.paymentMeansCode.code));
  return passed;
}

export const validateDkR005 = schematronRule(rule, evaluateDkR005);

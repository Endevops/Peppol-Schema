import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { everyCountryCodeIs, hasVatCategoryCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-B-01',
  level: 'fatal',
  message: 'An Invoice where the VAT category code (BT-151, BT-95 or BT-102) is “Split payment” shall be a domestic Italian invoice.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrB01(document: PeppolDocument): boolean {
  const passed = !hasVatCategoryCode(document, 'B') || everyCountryCodeIs(document, 'IT');
  return passed;
}

export const validateCenEn16931BrB01 = schematronRule(rule, evaluateCenEn16931BrB01);

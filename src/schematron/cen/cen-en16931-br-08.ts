import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-08',
  level: 'fatal',
  message: 'An Invoice shall contain the Seller postal address.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br08(document: PeppolDocument): boolean {
  const passed = typeof document.accountingSupplierParty.postalAddress === 'object' && document.accountingSupplierParty.postalAddress !== null;
  return passed;
}

export const validateCenEn16931Br08 = schematronRule(rule, evaluateCenEn16931Br08);

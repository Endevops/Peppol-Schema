import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-09',
  level: 'fatal',
  message: 'The Seller postal address (BG-5) shall contain a Seller country code (BT-40).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br09(document: PeppolDocument): boolean {
  const passed =
    typeof document.accountingSupplierParty.postalAddress.countryCode.identificationCode === 'string' &&
    document.accountingSupplierParty.postalAddress.countryCode.identificationCode.trim() !== '';
  return passed;
}

export const validateCenEn16931Br09 = schematronRule(rule, evaluateCenEn16931Br09);

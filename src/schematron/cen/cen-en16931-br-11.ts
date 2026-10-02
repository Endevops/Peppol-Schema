import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-11',
  level: 'fatal',
  message: 'The Buyer postal address shall contain a Buyer country code (BT-55).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br11(document: PeppolDocument): boolean {
  const passed =
    typeof document.accountingCustomerParty.party.postalAddress.countryCode.identificationCode === 'string' &&
    document.accountingCustomerParty.party.postalAddress.countryCode.identificationCode.trim() !== '';
  return passed;
}

export const validateCenEn16931Br11 = schematronRule(rule, evaluateCenEn16931Br11);

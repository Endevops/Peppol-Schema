import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-20',
  level: 'fatal',
  message:
    'The Seller tax representative postal address (BG-12) shall contain a Tax representative country code (BT-69), if the Seller (BG-4) has a Seller tax representative party (BG-11).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br20(document: PeppolDocument): boolean {
  const passed =
    !document.taxRepresentativeParty ||
    (typeof document.taxRepresentativeParty.postalAddress.countryCode.identificationCode === 'string' &&
      document.taxRepresentativeParty.postalAddress.countryCode.identificationCode.trim() !== '');
  return passed;
}

export const validateCenEn16931Br20 = schematronRule(rule, evaluateCenEn16931Br20);

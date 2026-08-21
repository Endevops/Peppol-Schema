import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-20',
  level: 'fatal',
  message:
    'The Seller tax representative postal address (BG-12) shall contain a Tax representative country code (BT-69), if the Seller (BG-4) has a Seller tax representative party (BG-11).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br20(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !document.taxRepresentativeParty ||
    (typeof document.taxRepresentativeParty.postalAddress.countryCode.identificationCode === 'string' &&
      document.taxRepresentativeParty.postalAddress.countryCode.identificationCode.trim() !== '');
  return schematronResult(rule, passed);
}

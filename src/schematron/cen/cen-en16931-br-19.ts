import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-19',
  level: 'fatal',
  message:
    'The Seller tax representative postal address (BG-12) shall be provided in the Invoice, if the Seller (BG-4) has a Seller tax representative party (BG-11).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br19(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !document.taxRepresentativeParty ||
    (typeof document.taxRepresentativeParty.postalAddress === 'object' && document.taxRepresentativeParty.postalAddress !== null);
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-19',
  level: 'fatal',
  message:
    'The Seller tax representative postal address (BG-12) shall be provided in the Invoice, if the Seller (BG-4) has a Seller tax representative party (BG-11).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br19(document: PeppolDocument): boolean {
  const passed =
    !document.taxRepresentativeParty ||
    (typeof document.taxRepresentativeParty.postalAddress === 'object' && document.taxRepresentativeParty.postalAddress !== null);
  return passed;
}

export const validateCenEn16931Br19 = schematronRule(rule, evaluateCenEn16931Br19);

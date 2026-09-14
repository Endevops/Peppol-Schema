import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-18',
  level: 'fatal',
  message:
    'The Seller tax representative name (BT-62) shall be provided in the Invoice, if the Seller (BG-4) has a Seller tax representative party (BG-11)',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br18(document: PeppolDocument): boolean {
  const passed =
    !document.taxRepresentativeParty ||
    (typeof document.taxRepresentativeParty.name === 'string' && document.taxRepresentativeParty.name.trim() !== '');
  return passed;
}

export const validateCenEn16931Br18 = schematronRule(rule, evaluateCenEn16931Br18);

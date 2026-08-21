import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-18',
  level: 'fatal',
  message:
    'The Seller tax representative name (BT-62) shall be provided in the Invoice, if the Seller (BG-4) has a Seller tax representative party (BG-11)',
} as const satisfies SchematronRule;

export function validateCenEn16931Br18(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !document.taxRepresentativeParty ||
    (typeof document.taxRepresentativeParty.name === 'string' && document.taxRepresentativeParty.name.trim() !== '');
  return schematronResult(rule, passed);
}

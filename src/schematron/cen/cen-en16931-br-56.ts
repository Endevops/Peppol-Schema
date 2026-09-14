import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasTaxRepresentativeVatCompanyId, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-56',
  level: 'fatal',
  message: 'Each Seller tax representative party (BG-11) shall have a Seller tax representative VAT identifier (BT-63).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br56(document: PeppolDocument): boolean {
  const passed = !document.taxRepresentativeParty || hasTaxRepresentativeVatCompanyId(document);
  return passed;
}

export const validateCenEn16931Br56 = schematronRule(rule, evaluateCenEn16931Br56);

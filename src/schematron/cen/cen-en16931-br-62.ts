import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-62',
  level: 'fatal',
  message: 'The Seller electronic address (BT-34) shall have a Scheme identifier.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br62(document: PeppolDocument): boolean {
  const passed =
    typeof document.accountingSupplierParty.endpointId?.schemeId === 'string' && document.accountingSupplierParty.endpointId.schemeId.trim() !== '';
  return passed;
}

export const validateCenEn16931Br62 = schematronRule(rule, evaluateCenEn16931Br62);

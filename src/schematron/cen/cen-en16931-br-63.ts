import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-63',
  level: 'fatal',
  message: 'The Buyer electronic address (BT-49) shall have a Scheme identifier.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br63(document: PeppolDocument): boolean {
  const passed =
    typeof document.accountingCustomerParty.endpointId?.schemeId === 'string' && document.accountingCustomerParty.endpointId.schemeId.trim() !== '';
  return passed;
}

export const validateCenEn16931Br63 = schematronRule(rule, evaluateCenEn16931Br63);

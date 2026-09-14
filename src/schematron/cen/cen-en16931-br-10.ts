import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-10',
  level: 'fatal',
  message: 'An Invoice shall contain the Buyer postal address (BG-8).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br10(document: PeppolDocument): boolean {
  const passed = typeof document.accountingCustomerParty.postalAddress === 'object' && document.accountingCustomerParty.postalAddress !== null;
  return passed;
}

export const validateCenEn16931Br10 = schematronRule(rule, evaluateCenEn16931Br10);

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-07',
  level: 'fatal',
  message: 'An Invoice shall contain the Buyer name (BT-44).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br07(document: PeppolDocument): boolean {
  const passed =
    typeof document.accountingCustomerParty.partyLegalEntity.registrationName === 'string' &&
    document.accountingCustomerParty.partyLegalEntity.registrationName.trim() !== '';
  return passed;
}

export const validateCenEn16931Br07 = schematronRule(rule, evaluateCenEn16931Br07);

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-06',
  level: 'fatal',
  message: 'An Invoice shall contain the Seller name (BT-27).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br06(document: PeppolDocument): boolean {
  const passed =
    typeof document.accountingSupplierParty.partyLegalEntity.registrationName === 'string' &&
    document.accountingSupplierParty.partyLegalEntity.registrationName.trim() !== '';
  return passed;
}

export const validateCenEn16931Br06 = schematronRule(rule, evaluateCenEn16931Br06);

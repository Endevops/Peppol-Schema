import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-06',
  level: 'fatal',
  message: 'An Invoice shall contain the Seller name (BT-27).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br06(document: PeppolDocument): SchematronRuleResult {
  const passed =
    typeof document.accountingSupplierParty.partyLegalEntity.registrationName === 'string' &&
    document.accountingSupplierParty.partyLegalEntity.registrationName.trim() !== '';
  return schematronResult(rule, passed);
}

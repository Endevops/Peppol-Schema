import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-07',
  level: 'fatal',
  message: 'An Invoice shall contain the Buyer name (BT-44).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br07(document: PeppolDocument): SchematronRuleResult {
  const passed =
    typeof document.accountingCustomerParty.partyLegalEntity.registrationName === 'string' &&
    document.accountingCustomerParty.partyLegalEntity.registrationName.trim() !== '';
  return schematronResult(rule, passed);
}

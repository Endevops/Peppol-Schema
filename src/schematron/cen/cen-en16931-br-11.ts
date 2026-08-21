import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-11',
  level: 'fatal',
  message: 'The Buyer postal address shall contain a Buyer country code (BT-55).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br11(document: PeppolDocument): SchematronRuleResult {
  const passed =
    typeof document.accountingCustomerParty.postalAddress.countryCode.identificationCode === 'string' &&
    document.accountingCustomerParty.postalAddress.countryCode.identificationCode.trim() !== '';
  return schematronResult(rule, passed);
}

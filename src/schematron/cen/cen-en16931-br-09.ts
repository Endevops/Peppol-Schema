import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-09',
  level: 'fatal',
  message: 'The Seller postal address (BG-5) shall contain a Seller country code (BT-40).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br09(document: PeppolDocument): SchematronRuleResult {
  const passed =
    typeof document.accountingSupplierParty.postalAddress.countryCode.identificationCode === 'string' &&
    document.accountingSupplierParty.postalAddress.countryCode.identificationCode.trim() !== '';
  return schematronResult(rule, passed);
}

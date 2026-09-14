import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getCustomerCountry, getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'IS-R-004',
  level: 'fatal',
  message: '[IS-R-004]-If seller and buyer are icelandic then the invoice shall contain the buyers icelandic legal identifier',
} as const satisfies SchematronRule;

function evaluateIsR004(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS' || getCustomerCountry(document) !== 'IS') {
    return true;
  }
  const companyId = document.accountingCustomerParty.partyLegalEntity.companyId;
  return Boolean(companyId?.id) && companyId?.schemeId === '0196';
}

export const validateIsR004 = schematronRule(rule, evaluateIsR004);

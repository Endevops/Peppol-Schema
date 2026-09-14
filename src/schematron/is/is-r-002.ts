import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'IS-R-002',
  level: 'fatal',
  message: '[IS-R-002]-If seller is icelandic then it shall contain sellers legal id',
} as const satisfies SchematronRule;

function evaluateIsR002(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'IS') {
    return true;
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  return Boolean(companyId?.id) && companyId?.schemeId === '0196';
}

export const validateIsR002 = schematronRule(rule, evaluateIsR002);

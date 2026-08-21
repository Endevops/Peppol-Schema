import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-002',
  level: 'fatal',
  message: '[IS-R-002]-If seller is icelandic then it shall contain sellers legal id',
} as const satisfies SchematronRule;

export function validateIsR002(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  return schematronResult(rule, Boolean(companyId?.id) && companyId?.schemeId === '0196');
}

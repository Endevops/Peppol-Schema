import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = { id: 'DK-R-002', level: 'fatal', message: 'Danish suppliers MUST provide legal entity (CVR-number)' } as const satisfies SchematronRule;

export function validateDkR002(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'DK') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId?.id;
  return schematronResult(rule, typeof companyId === 'string' && companyId.trim() !== '');
}

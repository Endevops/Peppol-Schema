import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = { id: 'SE-R-003', level: 'fatal', message: 'Swedish organisation numbers should be numeric.' } as const satisfies SchematronRule;

export function validateSeR003(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  return schematronResult(rule, companyId === undefined || /^\d+$/.test(companyId.id));
}

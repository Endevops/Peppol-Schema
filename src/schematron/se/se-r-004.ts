import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = { id: 'SE-R-004', level: 'fatal', message: 'Swedish organisation numbers consist of 10 characters.' } as const satisfies SchematronRule;

export function validateSeR004(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  return schematronResult(rule, companyId === undefined || companyId.id.trim().length === 10);
}

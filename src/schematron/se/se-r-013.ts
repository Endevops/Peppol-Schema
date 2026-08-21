import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { checkSEOrgnr } from '#/peppol-validations/check-se-orgnr';
import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-013',
  level: 'fatal',
  message: 'The last digit of a Swedish organization number must be valid according to the Luhn algorithm.',
} as const satisfies SchematronRule;

export function validateSeR013(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  return schematronResult(rule, companyId === undefined || checkSEOrgnr(companyId.id));
}

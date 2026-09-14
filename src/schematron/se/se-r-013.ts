import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { checkSEOrgnr } from '#/peppol-validations/check-se-orgnr.ts';
import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'SE-R-013',
  level: 'fatal',
  message: 'The last digit of a Swedish organization number must be valid according to the Luhn algorithm.',
} as const satisfies SchematronRule;

function evaluateSeR013(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  return companyId === undefined || checkSEOrgnr(companyId.id);
}

export const validateSeR013 = schematronRule(rule, evaluateSeR013);

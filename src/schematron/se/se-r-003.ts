import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = { id: 'SE-R-003', level: 'fatal', message: 'Swedish organisation numbers should be numeric.' } as const satisfies SchematronRule;

function evaluateSeR003(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  return companyId === undefined || /^\d+$/.test(companyId.id);
}

export const validateSeR003 = schematronRule(rule, evaluateSeR003);

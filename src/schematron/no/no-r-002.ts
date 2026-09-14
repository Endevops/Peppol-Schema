import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'NO-R-002',
  level: 'warning',
  message: 'For Norwegian suppliers, most invoice issuers are required to append "Foretaksregisteret" to their invoice.',
} as const satisfies SchematronRule;

function evaluateNoR002(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NO') {
    return true;
  }
  const taxCompanyId = document.accountingSupplierParty.partyTaxSchemes?.find(scheme => scheme.taxSchemeId.id === 'TAX')?.companyId;
  return taxCompanyId === 'Foretaksregisteret';
}

export const validateNoR002 = schematronRule(rule, evaluateNoR002);

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-014',
  level: 'fatal',
  message:
    'For Danish Suppliers it is mandatory to specify schemeID as "0184" (DK CVR-number) when PartyLegalEntity/CompanyID is used for AccountingSupplierParty',
} as const satisfies SchematronRule;

function evaluateDkR014(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'DK') {
    return true;
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  const passed = !companyId?.id || companyId.schemeId === '0184';
  return passed;
}

export const validateDkR014 = schematronRule(rule, evaluateDkR014);

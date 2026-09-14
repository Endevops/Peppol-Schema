import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-017',
  level: 'warning',
  message:
    'For Danish Customers it is mandatory to specify schemeID as "0184" (DK CVR-number) when PartyLegalEntity/CompanyID is used for AccountingCustomerParty',
} as const satisfies SchematronRule;

function evaluateDkR017(document: PeppolDocument): boolean {
  if (!isDanishSupplierAndCustomer(document)) {
    return true;
  }
  const companyId = document.accountingCustomerParty.partyLegalEntity.companyId;
  const passed = !companyId?.id || companyId.schemeId === '0184';
  return passed;
}

export const validateDkR017 = schematronRule(rule, evaluateDkR017);

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isDanishSupplierAndCustomer, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-013',
  level: 'fatal',
  message:
    'For Danish Suppliers it is mandatory to use schemeID when PartyIdentification/ID is used for AccountingCustomerParty or AccountingSupplierParty',
} as const satisfies SchematronRule;

export function validateDkR013(document: PeppolDocument): SchematronRuleResult {
  if (!isDanishSupplierAndCustomer(document)) {
    return schematronResult(rule, true);
  }
  const parties = [document.accountingSupplierParty, document.accountingCustomerParty];
  const passed = parties.every(party => {
    const id = party.partyIdentification?.id;
    return !id?.id || (typeof id.schemeId === 'string' && id.schemeId.trim() !== '');
  });
  return schematronResult(rule, passed);
}

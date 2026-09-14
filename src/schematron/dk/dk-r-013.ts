import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'DK-R-013',
  level: 'fatal',
  message:
    'For Danish Suppliers it is mandatory to use schemeID when PartyIdentification/ID is used for AccountingCustomerParty or AccountingSupplierParty',
} as const satisfies SchematronRule;

function evaluateDkR013(document: PeppolDocument): boolean {
  if (!isDanishSupplierAndCustomer(document)) {
    return true;
  }
  const parties = [document.accountingSupplierParty, document.accountingCustomerParty];
  const passed = parties.every(party => {
    const id = party.partyIdentification?.id;
    return !id?.id || (typeof id.schemeId === 'string' && id.schemeId.trim() !== '');
  });
  return passed;
}

export const validateDkR013 = schematronRule(rule, evaluateDkR013);

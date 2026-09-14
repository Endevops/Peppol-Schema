import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = { id: 'GR-R-005', level: 'fatal', message: 'Greek Suppliers must provide the full name of the buyer' } as const satisfies SchematronRule;

function evaluateGrR005(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const partyName = document.accountingCustomerParty.partyName?.name;
  return typeof partyName === 'string' && partyName.length > 0;
}

export const validateGrR005 = schematronRule(rule, evaluateGrR005);

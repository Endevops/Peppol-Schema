import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-002',
  level: 'fatal',
  message:
    'Greek Suppliers must provide their full name as they are registered in the Greek Business Registry (G.E.MH.) as a legal entity or in the Tax Registry as a natural person ',
} as const satisfies SchematronRule;

function evaluateGrR002(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const partyName = document.accountingSupplierParty.partyName?.name;
  return typeof partyName === 'string' && partyName.length > 0;
}

export const validateGrR002 = schematronRule(rule, evaluateGrR002);

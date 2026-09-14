import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'NL-R-003',
  level: 'fatal',
  message: '[NL-R-003] For suppliers in the Netherlands, the legal entity identifier MUST be either a KVK or OIN number (schemeID 0106 or 0190)',
} as const satisfies SchematronRule;

const ALLOWED_SCHEMES = new Set(['0106', '0190']);

function evaluateNlR003(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NL') {
    return true;
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  if (!companyId?.id) {
    return true;
  }
  return Boolean(companyId.schemeId && ALLOWED_SCHEMES.has(companyId.schemeId));
}

export const validateNlR003 = schematronRule(rule, evaluateNlR003);

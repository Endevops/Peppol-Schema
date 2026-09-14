import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = { id: 'DK-R-002', level: 'fatal', message: 'Danish suppliers MUST provide legal entity (CVR-number)' } as const satisfies SchematronRule;

function evaluateDkR002(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'DK') {
    return true;
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId?.id;
  return typeof companyId === 'string' && companyId.trim() !== '';
}

export const validateDkR002 = schematronRule(rule, evaluateDkR002);

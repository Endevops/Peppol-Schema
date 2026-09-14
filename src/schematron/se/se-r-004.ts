import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = { id: 'SE-R-004', level: 'fatal', message: 'Swedish organisation numbers consist of 10 characters.' } as const satisfies SchematronRule;

function evaluateSeR004(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  return companyId === undefined || companyId.id.trim().length === 10;
}

export const validateSeR004 = schematronRule(rule, evaluateSeR004);

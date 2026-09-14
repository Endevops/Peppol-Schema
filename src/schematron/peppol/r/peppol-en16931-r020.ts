import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = { id: 'PEPPOL-EN16931-R020', level: 'fatal', message: 'Seller electronic address MUST be provided' } as const satisfies SchematronRule;

function evaluatePeppolEn16931R020(document: PeppolDocument): boolean {
  const endpointId = document.accountingSupplierParty.endpointId?.id;
  return typeof endpointId === 'string' && endpointId.trim() !== '';
}

export const validatePeppolEn16931R020 = schematronRule(rule, evaluatePeppolEn16931R020);

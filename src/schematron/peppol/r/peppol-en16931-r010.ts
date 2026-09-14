import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = { id: 'PEPPOL-EN16931-R010', level: 'fatal', message: 'Buyer electronic address MUST be provided' } as const satisfies SchematronRule;

function evaluatePeppolEn16931R010(document: PeppolDocument): boolean {
  const endpointId = document.accountingCustomerParty.endpointId?.id;
  return typeof endpointId === 'string' && endpointId.trim() !== '';
}

export const validatePeppolEn16931R010 = schematronRule(rule, evaluatePeppolEn16931R010);

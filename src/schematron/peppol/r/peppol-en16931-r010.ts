import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = { id: 'PEPPOL-EN16931-R010', level: 'fatal', message: 'Buyer electronic address MUST be provided' } as const satisfies SchematronRule;

export function validatePeppolEn16931R010(document: PeppolDocument): SchematronRuleResult {
  const endpointId = document.accountingCustomerParty.endpointId?.id;
  return schematronResult(rule, typeof endpointId === 'string' && endpointId.trim() !== '');
}

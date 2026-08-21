import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-63',
  level: 'fatal',
  message: 'The Buyer electronic address (BT-49) shall have a Scheme identifier.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br63(document: PeppolDocument): SchematronRuleResult {
  const passed =
    typeof document.accountingCustomerParty.endpointId?.schemeId === 'string' && document.accountingCustomerParty.endpointId.schemeId.trim() !== '';
  return schematronResult(rule, passed);
}

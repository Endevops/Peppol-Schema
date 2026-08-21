import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-62',
  level: 'fatal',
  message: 'The Seller electronic address (BT-34) shall have a Scheme identifier.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br62(document: PeppolDocument): SchematronRuleResult {
  const passed =
    typeof document.accountingSupplierParty.endpointId?.schemeId === 'string' && document.accountingSupplierParty.endpointId.schemeId.trim() !== '';
  return schematronResult(rule, passed);
}

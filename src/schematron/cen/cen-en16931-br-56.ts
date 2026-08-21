import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasTaxRepresentativeVatCompanyId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-56',
  level: 'fatal',
  message: 'Each Seller tax representative party (BG-11) shall have a Seller tax representative VAT identifier (BT-63).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br56(document: PeppolDocument): SchematronRuleResult {
  const passed = !document.taxRepresentativeParty || hasTaxRepresentativeVatCompanyId(document);
  return schematronResult(rule, passed);
}

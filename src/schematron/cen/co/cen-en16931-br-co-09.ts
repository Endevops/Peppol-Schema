import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { allVatCompanyIdsHaveValidPrefix, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-09',
  level: 'fatal',
  message:
    'The Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) shall have a prefix in accordance with ISO code ISO 3166-1 alpha-2 by which the country of issue may be identified. Nevertheless, Greece may use the prefix ‘EL’.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo09(document: PeppolDocument): SchematronRuleResult {
  const passed = allVatCompanyIdsHaveValidPrefix(document);
  return schematronResult(rule, passed);
}

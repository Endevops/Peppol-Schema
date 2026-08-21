import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-04',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall be categorized with an Invoiced item VAT category code (BT-151).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo04(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(
    line => typeof line.item.classifiedTaxCategory?.id === 'string' && line.item.classifiedTaxCategory.taxSchemeId.id.toUpperCase() === 'VAT'
  );
  return schematronResult(rule, passed);
}

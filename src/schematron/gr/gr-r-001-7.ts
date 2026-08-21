import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-001-7',
  level: 'fatal',
  message: 'When Supplier is Greek, the Invoice Id sixth segment must not be empty',
} as const satisfies SchematronRule;

export function validateGrR001_7(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const segments = document.id.split('|');
  return schematronResult(rule, (segments[5]?.length ?? 0) > 0);
}

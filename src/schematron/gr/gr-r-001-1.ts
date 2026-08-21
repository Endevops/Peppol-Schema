import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-001-1',
  level: 'fatal',
  message: ' When the Supplier is Greek, the Invoice Id should consist of 6 segments',
} as const satisfies SchematronRule;

export function validateGrR001_1(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const segments = document.id.split('|');
  return schematronResult(rule, segments.length === 6);
}

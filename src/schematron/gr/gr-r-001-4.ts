import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-001-4',
  level: 'fatal',
  message: 'When Supplier is Greek, the Invoice Id third segment must be a positive integer',
} as const satisfies SchematronRule;

export function validateGrR001_4(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const segments = document.id.split('|');
  const thirdSegment = segments[2];
  if (!thirdSegment || thirdSegment.trim().length === 0) {
    return schematronResult(rule, false);
  }
  return schematronResult(rule, /^\d+$/.test(thirdSegment) && Number(thirdSegment) >= 0);
}

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-001-5',
  level: 'fatal',
  message: 'When Supplier is Greek, the Invoice Id in the fourth segment must be a valid greek document type',
} as const satisfies SchematronRule;

const GREEK_DOCUMENT_TYPES = new Set(['1.1', '1.6', '2.1', '2.4', '5.1', '5.2']);

export function validateGrR001_5(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const segments = document.id.split('|');
  const fourthSegment = segments[3];
  if (!fourthSegment || fourthSegment.trim().length === 0) {
    return schematronResult(rule, false);
  }
  return schematronResult(rule, GREEK_DOCUMENT_TYPES.has(fourthSegment));
}

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-001-5',
  level: 'fatal',
  message: 'When Supplier is Greek, the Invoice Id in the fourth segment must be a valid greek document type',
} as const satisfies SchematronRule;

const GREEK_DOCUMENT_TYPES = new Set(['1.1', '1.6', '2.1', '2.4', '5.1', '5.2']);

function evaluateGrR001_5(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const segments = document.id.split('|');
  const fourthSegment = segments[3];
  if (!fourthSegment || fourthSegment.trim().length === 0) {
    return false;
  }
  return GREEK_DOCUMENT_TYPES.has(fourthSegment);
}

export const validateGrR001_5 = schematronRule(rule, evaluateGrR001_5);

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-001-4',
  level: 'fatal',
  message: 'When Supplier is Greek, the Invoice Id third segment must be a positive integer',
} as const satisfies SchematronRule;

function evaluateGrR001_4(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const segments = document.id.split('|');
  const thirdSegment = segments[2];
  if (!thirdSegment || thirdSegment.trim().length === 0) {
    return false;
  }
  return /^\d+$/.test(thirdSegment) && Number(thirdSegment) >= 0;
}

export const validateGrR001_4 = schematronRule(rule, evaluateGrR001_4);

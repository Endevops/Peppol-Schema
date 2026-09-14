import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-001-1',
  level: 'fatal',
  message: ' When the Supplier is Greek, the Invoice Id should consist of 6 segments',
} as const satisfies SchematronRule;

function evaluateGrR001_1(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const segments = document.id.split('|');
  return segments.length === 6;
}

export const validateGrR001_1 = schematronRule(rule, evaluateGrR001_1);

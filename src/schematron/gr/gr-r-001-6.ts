import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-001-6',
  level: 'fatal',
  message: 'When Supplier is Greek, the Invoice Id fifth segment must not be empty',
} as const satisfies SchematronRule;

function evaluateGrR001_6(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const segments = document.id.split('|');
  return (segments[4]?.length ?? 0) > 0;
}

export const validateGrR001_6 = schematronRule(rule, evaluateGrR001_6);

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-001-7',
  level: 'fatal',
  message: 'When Supplier is Greek, the Invoice Id sixth segment must not be empty',
} as const satisfies SchematronRule;

function evaluateGrR001_7(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const segments = document.id.split('|');
  return (segments[5]?.length ?? 0) > 0;
}

export const validateGrR001_7 = schematronRule(rule, evaluateGrR001_7);

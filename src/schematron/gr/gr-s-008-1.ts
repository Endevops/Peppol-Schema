import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-S-008-1',
  level: 'warning',
  message: 'When Supplier is Greek, there should be one invoice url',
} as const satisfies SchematronRule;

function evaluateGrS008_1(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const urlCount = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === '##INVOICE|URL##').length;
  return urlCount === 1;
}

export const validateGrS008_1 = schematronRule(rule, evaluateGrS008_1);

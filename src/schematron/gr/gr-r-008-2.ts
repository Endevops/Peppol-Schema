import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-008-2',
  level: 'fatal',
  message: 'When Supplier is Greek, there should be no more than one invoice url',
} as const satisfies SchematronRule;

function evaluateGrR008_2(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const urlCount = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === '##INVOICE|URL##').length;
  return urlCount <= 1;
}

export const validateGrR008_2 = schematronRule(rule, evaluateGrR008_2);

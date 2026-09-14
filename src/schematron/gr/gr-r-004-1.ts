import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-004-1',
  level: 'fatal',
  message: ' When Supplier is Greek, there must be one MARK Number',
} as const satisfies SchematronRule;

function evaluateGrR004_1(document: PeppolDocument): boolean {
  const isGreek = getSupplierCountry(document) === 'GR' || getSupplierCountry(document) === 'EL';
  if (!isGreek) {
    return true;
  }
  const markCount = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === '##M.AR.K##').length;
  return markCount === 1;
}

export const validateGrR004_1 = schematronRule(rule, evaluateGrR004_1);

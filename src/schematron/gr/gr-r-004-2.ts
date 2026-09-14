import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-004-2',
  level: 'fatal',
  message: 'When Supplier is Greek, the MARK Number must be a positive integer',
} as const satisfies SchematronRule;

function evaluateGrR004_2(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const markReferences = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === '##M.AR.K##');
  const passed = markReferences.every(ref => /^[1-9][0-9]*$/.test(ref.id.id));
  return passed;
}

export const validateGrR004_2 = schematronRule(rule, evaluateGrR004_2);

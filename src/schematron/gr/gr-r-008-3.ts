import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-008-3',
  level: 'fatal',
  message: 'When Supplier is Greek and the INVOICE URL Document reference exists, the External Reference URI should be present',
} as const satisfies SchematronRule;

function evaluateGrR008_3(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const urlReferences = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === '##INVOICE|URL##');
  const passed = urlReferences.every(ref => {
    const uri = ref.attachment?.externalReference?.uri;
    return typeof uri === 'string' && uri.trim() !== '';
  });
  return passed;
}

export const validateGrR008_3 = schematronRule(rule, evaluateGrR008_3);

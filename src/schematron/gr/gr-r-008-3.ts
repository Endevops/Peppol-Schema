import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-008-3',
  level: 'fatal',
  message: 'When Supplier is Greek and the INVOICE URL Document reference exists, the External Reference URI should be present',
} as const satisfies SchematronRule;

export function validateGrR008_3(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const urlReferences = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === '##INVOICE|URL##');
  const passed = urlReferences.every(ref => {
    const uri = ref.attachment?.externalReference?.uri;
    return typeof uri === 'string' && uri.trim() !== '';
  });
  return schematronResult(rule, passed);
}

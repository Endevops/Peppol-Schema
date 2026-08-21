import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-S-008-1',
  level: 'warning',
  message: 'When Supplier is Greek, there should be one invoice url',
} as const satisfies SchematronRule;

export function validateGrS008_1(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const urlCount = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === '##INVOICE|URL##').length;
  return schematronResult(rule, urlCount === 1);
}

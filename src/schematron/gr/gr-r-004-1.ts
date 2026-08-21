import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-004-1',
  level: 'fatal',
  message: ' When Supplier is Greek, there must be one MARK Number',
} as const satisfies SchematronRule;

export function validateGrR004_1(document: PeppolDocument): SchematronRuleResult {
  const isGreek = getSupplierCountry(document) === 'GR' || getSupplierCountry(document) === 'EL';
  if (!isGreek) {
    return schematronResult(rule, true);
  }
  const markCount = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === '##M.AR.K##').length;
  return schematronResult(rule, markCount === 1);
}

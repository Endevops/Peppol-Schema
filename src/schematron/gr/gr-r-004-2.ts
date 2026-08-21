import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-004-2',
  level: 'fatal',
  message: 'When Supplier is Greek, the MARK Number must be a positive integer',
} as const satisfies SchematronRule;

export function validateGrR004_2(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const markReferences = (document.additionalDocumentReferences ?? []).filter(ref => ref.documentDescription === '##M.AR.K##');
  const passed = markReferences.every(ref => /^[1-9][0-9]*$/.test(ref.id.id));
  return schematronResult(rule, passed);
}

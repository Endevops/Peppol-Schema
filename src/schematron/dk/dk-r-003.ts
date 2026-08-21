import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getLines, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-003',
  level: 'warning',
  message: 'If ItemClassification is provided from Danish suppliers, UNSPSC version 19.05.01 or 26.08.01 should be used.',
} as const satisfies SchematronRule;

const ALLOWED_VERSIONS = new Set(['19.05.01', '19.0501', '26.08.01', '26.0801']);

export function validateDkR003(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'DK' || getCustomerCountry(document) !== 'DK') {
    return schematronResult(rule, true);
  }
  const passed = getLines(document).every(line =>
    (line.item.commodityClassifications ?? []).every(classification => {
      const classificationCode = classification.itemClassification;
      return (
        classificationCode.listId !== 'TST' ||
        (classificationCode.listVersionId !== undefined && ALLOWED_VERSIONS.has(classificationCode.listVersionId))
      );
    })
  );
  return schematronResult(rule, passed);
}

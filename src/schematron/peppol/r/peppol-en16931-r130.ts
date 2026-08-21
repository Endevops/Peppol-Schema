import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R130',
  level: 'fatal',
  message: 'Unit code of price base quantity MUST be same as invoiced quantity.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R130(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => {
    const baseQuantity = line.price.baseQuantity;
    if (!baseQuantity?.unitCode) {
      return true;
    }
    const quantity = 'invoicedQuantity' in line ? line.invoicedQuantity : 'creditedQuantity' in line ? line.creditedQuantity : undefined;
    if (!quantity) {
      return true;
    }
    return baseQuantity.unitCode === quantity.unitCode;
  });
  return schematronResult(rule, passed);
}

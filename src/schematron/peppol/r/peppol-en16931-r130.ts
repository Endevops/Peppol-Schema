import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R130',
  level: 'fatal',
  message: 'Unit code of price base quantity MUST be same as invoiced quantity.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R130(document: PeppolDocument): boolean {
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
  return passed;
}

export const validatePeppolEn16931R130 = schematronRule(rule, evaluatePeppolEn16931R130);

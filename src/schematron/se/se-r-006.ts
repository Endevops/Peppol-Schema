import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-006',
  level: 'fatal',
  message: 'For Swedish suppliers, only standard VAT rate of 6, 12 or 25 are used',
} as const satisfies SchematronRule;

const ALLOWED_RATES = new Set([6, 12, 25]);

function evaluateSeR006(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'SE') {
    return true;
  }
  const passed = getLines(document).every(line => {
    const percent = line.item.classifiedTaxCategory.percent;
    return percent === undefined || ALLOWED_RATES.has(percent);
  });
  return passed;
}

export const validateSeR006 = schematronRule(rule, evaluateSeR006);

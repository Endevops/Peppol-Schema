import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'SE-R-006',
  level: 'fatal',
  message: 'For Swedish suppliers, only standard VAT rate of 6, 12 or 25 are used',
} as const satisfies SchematronRule;

const ALLOWED_RATES = new Set([6, 12, 25]);

export function validateSeR006(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'SE') {
    return schematronResult(rule, true);
  }
  const passed = getLines(document).every(line => {
    const percent = line.item.classifiedTaxCategory.percent;
    return percent === undefined || ALLOWED_RATES.has(percent);
  });
  return schematronResult(rule, passed);
}

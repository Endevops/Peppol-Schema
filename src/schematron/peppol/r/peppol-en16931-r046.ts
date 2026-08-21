import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult, slack } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R046',
  level: 'fatal',
  message: 'Item net price MUST equal (Gross price - Allowance amount) when gross price is provided.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R046(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => {
    const price = line.price;
    const allowance = price.allowanceCharge;
    if (!allowance || allowance.baseAmount === undefined) {
      return true;
    }
    return slack(allowance.baseAmount.value - (allowance.amount?.value ?? 0), price.priceAmount.value, 0.02);
  });
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule, slack } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R046',
  level: 'fatal',
  message: 'Item net price MUST equal (Gross price - Allowance amount) when gross price is provided.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R046(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => {
    const price = line.price;
    const allowance = price.allowanceCharge;
    if (!allowance || allowance.baseAmount === undefined) {
      return true;
    }
    return slack(allowance.baseAmount.value - (allowance.amount?.value ?? 0), price.priceAmount.value, 0.02);
  });
  return passed;
}

export const validatePeppolEn16931R046 = schematronRule(rule, evaluatePeppolEn16931R046);

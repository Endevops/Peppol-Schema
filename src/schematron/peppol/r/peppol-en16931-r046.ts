import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';
import type { SchematronFieldIssue } from '#/schematron/types.ts';

import { fieldIssue, getLines, getLinesArrayName, schematronRule, slack } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R046',
  level: 'fatal',
  message: 'Item net price MUST equal (Gross price - Allowance amount) when gross price is provided.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R046(document: PeppolDocument): ReadonlyArray<SchematronFieldIssue> {
  const linesName = getLinesArrayName(document);
  const issues: Array<SchematronFieldIssue> = [];

  getLines(document).forEach((line, lineIndex) => {
    const allowanceCharge = line.price.allowanceCharge;
    if (!allowanceCharge || allowanceCharge.baseAmount === undefined) {
      return;
    }
    const amount = allowanceCharge.amount.value;
    const priceAmount = line.price.priceAmount.value;
    if (slack(allowanceCharge.baseAmount.value - amount, priceAmount, 0.02)) {
      return;
    }
    const path = `${linesName}[${lineIndex}].price`;
    issues.push(
      fieldIssue(`${path}.allowanceCharge.baseAmount.value`, priceAmount + amount, allowanceCharge.baseAmount.value),
      fieldIssue(`${path}.priceAmount.value`, null, priceAmount),
      fieldIssue(`${path}.allowanceCharge.amount.value`, null, amount)
    );
  });

  return issues;
}

export const validatePeppolEn16931R046 = schematronRule(rule, evaluatePeppolEn16931R046);

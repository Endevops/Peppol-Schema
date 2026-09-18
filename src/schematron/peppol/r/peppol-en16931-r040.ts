import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';
import type { SchematronFieldIssue } from '#/schematron/types.ts';

import { fieldIssue, getLines, getLinesArrayName, schematronRule, slack } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R040',
  level: 'fatal',
  message: 'Allowance/charge amount must equal base amount * percentage/100 if base amount and percentage exists',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R040(document: PeppolDocument): ReadonlyArray<SchematronFieldIssue> {
  const linesName = getLinesArrayName(document);
  const issues: Array<SchematronFieldIssue> = [];

  const collect = (
    allowanceCharge: {
      amount?: { value: number } | undefined;
      baseAmount?: { value: number } | undefined;
      multiplierFactorNumeric?: number | undefined;
    },
    path: string
  ): void => {
    if (!allowanceCharge.multiplierFactorNumeric || allowanceCharge.baseAmount === undefined) {
      return;
    }
    const actual = allowanceCharge.amount?.value ?? 0;
    const expected = (allowanceCharge.baseAmount.value * allowanceCharge.multiplierFactorNumeric) / 100;
    if (slack(expected, actual, 0.02)) {
      return;
    }
    issues.push(
      fieldIssue(`${path}.amount.value`, expected, actual),
      fieldIssue(`${path}.baseAmount.value`, null, allowanceCharge.baseAmount.value),
      fieldIssue(`${path}.multiplierFactorNumeric`, null, allowanceCharge.multiplierFactorNumeric)
    );
  };

  (document.allowanceCharges ?? []).forEach((allowanceCharge, allowanceChargeIndex) => {
    collect(allowanceCharge, `allowanceCharges[${allowanceChargeIndex}]`);
  });
  getLines(document).forEach((line, lineIndex) => {
    (line.allowanceCharges ?? []).forEach((allowanceCharge, allowanceChargeIndex) => {
      collect(allowanceCharge, `${linesName}[${lineIndex}].allowanceCharges[${allowanceChargeIndex}]`);
    });
  });

  return issues;
}

export const validatePeppolEn16931R040 = schematronRule(rule, evaluatePeppolEn16931R040);

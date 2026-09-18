import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, getLines, getLinesArrayName, round2, schematronRule, sumFieldIssues } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-10',
  level: 'fatal',
  message: 'Sum of Invoice line net amount (BT-106) = Σ Invoice line net amount (BT-131).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo10(document: PeppolDocument) {
  const linesArrayName = getLinesArrayName(document);
  return sumFieldIssues({
    aggregate: { actual: document.legalMonetaryTotal.lineExtensionAmount.value, path: 'legalMonetaryTotal.lineExtensionAmount.value' },
    components: getLines(document).map((line, index) => ({
      actual: line.lineExtensionAmount.value,
      contribution: line.lineExtensionAmount.value,
      path: `${linesArrayName}[${index}].lineExtensionAmount.value`,
    })),
    isEqual: (actual, expected) => amountsEqual(round2(actual), round2(expected)),
  });
}

export const validateCenEn16931BrCo10 = schematronRule(rule, evaluateCenEn16931BrCo10);

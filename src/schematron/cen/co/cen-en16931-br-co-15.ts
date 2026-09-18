import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, fieldIssue, round2, schematronRule, sumFieldIssues } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-15',
  level: 'fatal',
  message: 'Invoice total amount with VAT (BT-112) = Invoice total amount without VAT (BT-109) + Invoice total VAT amount (BT-110).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo15(document: PeppolDocument) {
  let matchingTaxAmount: { actual: number; path: string } | undefined;
  let matchCount = 0;
  for (const [index, taxTotal] of document.taxTotals.entries()) {
    if (taxTotal.taxAmount.currencyId === document.documentCurrencyCode) {
      matchCount += 1;
      matchingTaxAmount = { actual: taxTotal.taxAmount.value, path: `taxTotals[${index}].taxAmount.value` };
    }
  }
  if (matchCount !== 1 || matchingTaxAmount === undefined) {
    return [fieldIssue('taxTotals', 1, matchCount)];
  }
  const total = document.legalMonetaryTotal;
  return sumFieldIssues({
    aggregate: { actual: total.taxInclusiveAmount.value, path: 'legalMonetaryTotal.taxInclusiveAmount.value' },
    components: [
      { actual: total.taxExclusiveAmount.value, contribution: total.taxExclusiveAmount.value, path: 'legalMonetaryTotal.taxExclusiveAmount.value' },
      { actual: matchingTaxAmount.actual, contribution: matchingTaxAmount.actual, path: matchingTaxAmount.path },
    ],
    isEqual: (actual, expected) => amountsEqual(round2(actual), round2(expected)),
  });
}

export const validateCenEn16931BrCo15 = schematronRule(rule, evaluateCenEn16931BrCo15);

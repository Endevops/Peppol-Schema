import type { PeppolTaxSubTotal } from '#/schemas/fields/peppol-tax-subtotal-schema.ts';
import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';
import type { SchematronFieldIssue } from '#/schematron/types.ts';

import { fieldIssue, round2, schematronRule, withinSlackOne } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-17',
  level: 'fatal',
  message: 'VAT category tax amount (BT-117) = VAT category taxable amount (BT-116) x (VAT category rate (BT-119) / 100), rounded to two decimals.',
} as const satisfies SchematronRule;

/**
 * @description Field issues for a single VAT breakdown (BG-23) subtotal compared against its VAT category rate (BT-119).
 *
 * @param subtotalIndex - The index of the subtotal within its tax total, used to build the reported field paths.
 * @param subtotal - The VAT breakdown subtotal whose tax amount (BT-117), taxable amount (BT-116) and rate (BT-119) are compared.
 * @param taxTotalIndex - The index of the enclosing tax total, used to build the reported field paths.
 *
 * @returns An empty array when the subtotal satisfies the rule, otherwise the differing field issues.
 */
function subtotalFieldIssues(taxTotalIndex: number, subtotalIndex: number, subtotal: PeppolTaxSubTotal): ReadonlyArray<SchematronFieldIssue> {
  const subtotalPath = `taxTotals[${taxTotalIndex}].taxSubtotals[${subtotalIndex}]`;
  const taxAmountPath = `${subtotalPath}.taxAmount.value`;
  const taxableAmountPath = `${subtotalPath}.taxableAmount.value`;
  const percentPath = `${subtotalPath}.taxCategory.percent`;
  const taxAmount = subtotal.taxAmount.value;
  const percent = subtotal.taxCategory.percent;
  if (percent === undefined) {
    if (Math.round(taxAmount) !== 0) {
      return [fieldIssue(taxAmountPath, 0, taxAmount), fieldIssue(percentPath, null, null)];
    }
    return [];
  }
  if (Math.round(percent) === 0) {
    if (Math.round(taxAmount) !== 0) {
      return [
        fieldIssue(taxAmountPath, 0, taxAmount),
        fieldIssue(taxableAmountPath, null, subtotal.taxableAmount.value),
        fieldIssue(percentPath, null, percent),
      ];
    }
    return [];
  }
  const expected = round2(Math.abs(subtotal.taxableAmount.value) * (percent / 100));
  if (!withinSlackOne(Math.abs(taxAmount), expected)) {
    return [
      fieldIssue(taxAmountPath, expected, taxAmount),
      fieldIssue(taxableAmountPath, null, subtotal.taxableAmount.value),
      fieldIssue(percentPath, null, percent),
    ];
  }
  return [];
}

function evaluateCenEn16931BrCo17(document: PeppolDocument): Array<SchematronFieldIssue> {
  return document.taxTotals.flatMap((taxTotal, taxTotalIndex) =>
    (taxTotal.taxSubtotals ?? []).flatMap((subtotal, subtotalIndex) => subtotalFieldIssues(taxTotalIndex, subtotalIndex, subtotal))
  );
}

export const validateCenEn16931BrCo17 = schematronRule(rule, evaluateCenEn16931BrCo17);

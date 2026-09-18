import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';
import type { SchematronFieldIssue } from '#/schematron/types.ts';

import { fieldIssue, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-IC-09',
  level: 'fatal',
  message:
    'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" shall be 0 (zero).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrIc09(document: PeppolDocument): ReadonlyArray<SchematronFieldIssue> {
  const issues: Array<SchematronFieldIssue> = [];

  document.taxTotals.forEach((total, taxTotalIndex) => {
    (total.taxSubtotals ?? []).forEach((subtotal, taxSubtotalIndex) => {
      if (subtotal.taxCategory.id !== 'K' || subtotal.taxAmount.value === 0) {
        return;
      }
      issues.push(fieldIssue(`taxTotals[${taxTotalIndex}].taxSubtotals[${taxSubtotalIndex}].taxAmount.value`, 0, subtotal.taxAmount.value));
    });
  });

  return issues;
}

export const validateCenEn16931BrIc09 = schematronRule(rule, evaluateCenEn16931BrIc09);

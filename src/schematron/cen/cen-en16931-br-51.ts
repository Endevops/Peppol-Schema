import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-51',
  level: 'warning',
  message:
    'In accordance with card payments security standards an invoice should never include a full card primary account number (BT-87). At the moment PCI Security Standards Council has defined that the first 6 digits and last 4 digits are the maximum number of digits to be shown.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br51(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.paymentMeans ?? []).every(pm => !pm.cardAccount || pm.cardAccount.primaryAccountNumberId.trim().length <= 10);
  return schematronResult(rule, passed);
}

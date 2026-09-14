import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-51',
  level: 'warning',
  message:
    'In accordance with card payments security standards an invoice should never include a full card primary account number (BT-87). At the moment PCI Security Standards Council has defined that the first 6 digits and last 4 digits are the maximum number of digits to be shown.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br51(document: PeppolDocument): boolean {
  const passed = (document.paymentMeans ?? []).every(pm => !pm.cardAccount || pm.cardAccount.primaryAccountNumberId.trim().length <= 10);
  return passed;
}

export const validateCenEn16931Br51 = schematronRule(rule, evaluateCenEn16931Br51);

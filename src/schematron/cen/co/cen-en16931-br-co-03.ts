import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-03',
  level: 'fatal',
  message: 'Value added tax point date (BT-7) and Value added tax point date code (BT-8) are mutually exclusive.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo03(document: PeppolDocument): boolean {
  const passed = !document.taxPointDate || !document.invoicePeriod?.descriptionCode;
  return passed;
}

export const validateCenEn16931BrCo03 = schematronRule(rule, evaluateCenEn16931BrCo03);

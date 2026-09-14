import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-18',
  level: 'fatal',
  message: 'An Invoice shall at least have one VAT breakdown group (BG-23).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo18(document: PeppolDocument): boolean {
  const passed = document.taxTotals.some(total => (total.taxSubtotals?.length ?? 0) > 0);
  return passed;
}

export const validateCenEn16931BrCo18 = schematronRule(rule, evaluateCenEn16931BrCo18);

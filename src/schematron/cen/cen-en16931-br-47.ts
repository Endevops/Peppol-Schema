import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-47',
  level: 'fatal',
  message: 'Each VAT breakdown (BG-23) shall be defined through a VAT category code (BT-118).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br47(document: PeppolDocument): boolean {
  const passed = document.taxTotals.every(total =>
    (total.taxSubtotals ?? []).every(st => typeof st.taxCategory?.id === 'string' && st.taxCategory.taxSchemeId.id.toUpperCase() === 'VAT')
  );
  return passed;
}

export const validateCenEn16931Br47 = schematronRule(rule, evaluateCenEn16931Br47);

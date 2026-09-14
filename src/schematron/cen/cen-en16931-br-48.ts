import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-48',
  level: 'fatal',
  message: 'Each VAT breakdown (BG-23) shall have a VAT category rate (BT-119), except if the Invoice is not subject to VAT.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br48(document: PeppolDocument): boolean {
  const passed = document.taxTotals.every(total =>
    (total.taxSubtotals ?? []).every(st => typeof st.taxCategory.percent === 'number' || st.taxCategory.id === 'O')
  );
  return passed;
}

export const validateCenEn16931Br48 = schematronRule(rule, evaluateCenEn16931Br48);

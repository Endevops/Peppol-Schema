import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-37',
  level: 'fatal',
  message: 'Each Document level charge (BG-21) shall have a Document level charge VAT category code (BT-102).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br37(document: PeppolDocument): boolean {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => ac.chargeIndicator)
    .every(ac => typeof ac.taxCategory?.id === 'string' && ac.taxCategory.taxSchemeId.id.toUpperCase() === 'VAT');
  return passed;
}

export const validateCenEn16931Br37 = schematronRule(rule, evaluateCenEn16931Br37);

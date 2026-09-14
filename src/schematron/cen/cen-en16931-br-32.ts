import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-32',
  level: 'fatal',
  message: 'Each Document level allowance (BG-20) shall have a Document level allowance VAT category code (BT-95).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br32(document: PeppolDocument): boolean {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => !ac.chargeIndicator)
    .every(ac => typeof ac.taxCategory?.id === 'string' && ac.taxCategory.taxSchemeId.id.toUpperCase() === 'VAT');
  return passed;
}

export const validateCenEn16931Br32 = schematronRule(rule, evaluateCenEn16931Br32);

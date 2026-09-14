import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-57',
  level: 'fatal',
  message: 'Each Deliver to address (BG-15) shall contain a Deliver to country code (BT-80).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br57(document: PeppolDocument): boolean {
  const passed =
    typeof document.delivery?.deliveryLocation?.address?.countryCode.identificationCode === 'string' &&
    document.delivery.deliveryLocation.address.countryCode.identificationCode.trim() !== '';
  return passed;
}

export const validateCenEn16931Br57 = schematronRule(rule, evaluateCenEn16931Br57);

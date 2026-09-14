import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasVatBreakdownCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-12',
  level: 'fatal',
  message:
    'In an Invoice with a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" the Deliver to country code (BT-80) shall not be blank.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrIc12(document: PeppolDocument): boolean {
  const passed =
    !hasVatBreakdownCode(document, 'K') ||
    (typeof document.delivery?.deliveryLocation?.address?.countryCode.identificationCode === 'string' &&
      document.delivery.deliveryLocation.address.countryCode.identificationCode.trim() !== '');
  return passed;
}

export const validateCenEn16931BrIc12 = schematronRule(rule, evaluateCenEn16931BrIc12);

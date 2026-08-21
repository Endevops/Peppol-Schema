import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasVatBreakdownCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-12',
  level: 'fatal',
  message:
    'In an Invoice with a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" the Deliver to country code (BT-80) shall not be blank.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrIc12(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !hasVatBreakdownCode(document, 'K') ||
    (typeof document.delivery?.deliveryLocation?.address?.countryCode.identificationCode === 'string' &&
      document.delivery.deliveryLocation.address.countryCode.identificationCode.trim() !== '');
  return schematronResult(rule, passed);
}

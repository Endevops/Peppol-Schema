import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasVatBreakdownCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-IC-11',
  level: 'fatal',
  message:
    'In an Invoice with a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" the Actual delivery date (BT-72) or the Invoicing period (BG-14) shall not be blank.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrIc11(document: PeppolDocument): boolean {
  const passed =
    !hasVatBreakdownCode(document, 'K') || document.delivery?.actualDeliveryDate !== undefined || typeof document.invoicePeriod === 'object';
  return passed;
}

export const validateCenEn16931BrIc11 = schematronRule(rule, evaluateCenEn16931BrIc11);

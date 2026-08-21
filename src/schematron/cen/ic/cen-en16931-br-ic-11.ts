import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasVatBreakdownCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-IC-11',
  level: 'fatal',
  message:
    'In an Invoice with a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Intra-community supply" the Actual delivery date (BT-72) or the Invoicing period (BG-14) shall not be blank.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrIc11(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !hasVatBreakdownCode(document, 'K') ||
    (typeof document.delivery?.actualDeliveryDate === 'string' && document.delivery.actualDeliveryDate.trim() !== '') ||
    typeof document.invoicePeriod === 'object';
  return schematronResult(rule, passed);
}

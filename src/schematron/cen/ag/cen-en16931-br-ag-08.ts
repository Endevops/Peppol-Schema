import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyVatBreakdownTaxableMatchesRateSum, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-AG-08',
  level: 'fatal',
  message:
    'For each different value of VAT category rate (BT-119) where the VAT category code (BT-118) is "IPSI", the VAT category taxable amount (BT-116) in a VAT breakdown (BG-23) shall equal the sum of Invoice line net amounts (BT-131) plus the sum of document level charge amounts (BT-99) minus the sum of document level allowance amounts (BT-92) where the VAT category code (BT-151, BT-102, BT-95) is "IPSI" and the VAT rate (BT-152, BT-103, BT-96) equals the VAT category rate (BT-119).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrAg08(document: PeppolDocument): boolean {
  const passed = everyVatBreakdownTaxableMatchesRateSum(document);
  return passed;
}

export const validateCenEn16931BrAg08 = schematronRule(rule, evaluateCenEn16931BrAg08);

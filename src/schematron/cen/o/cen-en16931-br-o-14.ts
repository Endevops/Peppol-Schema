import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasVatBreakdownCode, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-O-14',
  level: 'fatal',
  message:
    'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain Document level charges (BG-21) where Document level charge VAT category code (BT-102) is not "Not subject to VAT".',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO14(document: PeppolDocument): boolean {
  const passed =
    !hasVatBreakdownCode(document, 'O') ||
    (document.allowanceCharges ?? []).every(ac => !ac.chargeIndicator || ac.taxCategory?.id === undefined || ac.taxCategory.id === 'O');
  return passed;
}

export const validateCenEn16931BrO14 = schematronRule(rule, evaluateCenEn16931BrO14);

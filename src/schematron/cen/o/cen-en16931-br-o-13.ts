import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasVatBreakdownCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-13',
  level: 'fatal',
  message:
    'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain Document level allowances (BG-20) where Document level allowance VAT category code (BT-95) is not "Not subject to VAT".',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrO13(document: PeppolDocument): boolean {
  const passed =
    !hasVatBreakdownCode(document, 'O') ||
    (document.allowanceCharges ?? []).every(ac => ac.chargeIndicator || ac.taxCategory?.id === undefined || ac.taxCategory.id === 'O');
  return passed;
}

export const validateCenEn16931BrO13 = schematronRule(rule, evaluateCenEn16931BrO13);

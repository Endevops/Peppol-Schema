import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { hasVatBreakdownCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-O-14',
  level: 'fatal',
  message:
    'An Invoice that contains a VAT breakdown group (BG-23) with a VAT category code (BT-118) "Not subject to VAT" shall not contain Document level charges (BG-21) where Document level charge VAT category code (BT-102) is not "Not subject to VAT".',
} as const satisfies SchematronRule;

export function validateCenEn16931BrO14(document: PeppolDocument): SchematronRuleResult {
  const passed =
    !hasVatBreakdownCode(document, 'O') ||
    (document.allowanceCharges ?? []).every(ac => !ac.chargeIndicator || ac.taxCategory?.id === undefined || ac.taxCategory.id === 'O');
  return schematronResult(rule, passed);
}

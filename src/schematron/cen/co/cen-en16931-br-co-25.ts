import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-25',
  level: 'fatal',
  message:
    'In case the Amount due for payment (BT-115) is positive, either the Payment due date (BT-9) or the Payment terms (BT-20) shall be present.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo25(document: PeppolDocument): SchematronRuleResult {
  const passed =
    document.legalMonetaryTotal.payableAmount.value <= 0 || typeof document.dueDate === 'string' || typeof document.paymentTerms?.note === 'string';
  return schematronResult(rule, passed);
}

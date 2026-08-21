import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-04',
  level: 'fatal',
  message: 'An Invoice shall have an Invoice type code (BT-3).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br04(document: PeppolDocument): SchematronRuleResult {
  const passed =
    (typeof document.invoiceTypeCode === 'string' && document.invoiceTypeCode.trim() !== '') ||
    (typeof document.creditNoteTypeCode === 'string' && document.creditNoteTypeCode.trim() !== '');
  return schematronResult(rule, passed);
}

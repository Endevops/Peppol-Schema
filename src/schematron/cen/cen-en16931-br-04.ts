import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-04',
  level: 'fatal',
  message: 'An Invoice shall have an Invoice type code (BT-3).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br04(document: PeppolDocument): boolean {
  const passed =
    (typeof document.invoiceTypeCode === 'string' && document.invoiceTypeCode.trim() !== '') ||
    (typeof document.creditNoteTypeCode === 'string' && document.creditNoteTypeCode.trim() !== '');
  return passed;
}

export const validateCenEn16931Br04 = schematronRule(rule, evaluateCenEn16931Br04);

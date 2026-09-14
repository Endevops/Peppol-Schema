import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R005',
  level: 'fatal',
  message: 'VAT accounting currency code MUST be different from invoice currency code when provided.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R005(document: PeppolDocument): boolean {
  if (!document.taxCurrencyCode) {
    return true;
  }
  return document.taxCurrencyCode !== document.documentCurrencyCode;
}

export const validatePeppolEn16931R005 = schematronRule(rule, evaluatePeppolEn16931R005);

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R005',
  level: 'fatal',
  message: 'VAT accounting currency code MUST be different from invoice currency code when provided.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R005(document: PeppolDocument): SchematronRuleResult {
  if (!document.taxCurrencyCode) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, document.taxCurrencyCode !== document.documentCurrencyCode);
}

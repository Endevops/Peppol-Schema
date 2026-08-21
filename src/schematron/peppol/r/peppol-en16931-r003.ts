import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R003',
  level: 'fatal',
  message: 'A buyer reference or purchase order reference MUST be provided.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R003(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.buyerReference === 'string' && document.buyerReference.trim() !== '' ? true : Boolean(document.orderReference?.id);
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R003',
  level: 'fatal',
  message: 'A buyer reference or purchase order reference MUST be provided.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R003(document: PeppolDocument): boolean {
  const passed = typeof document.buyerReference === 'string' && document.buyerReference.trim() !== '' ? true : Boolean(document.orderReference?.id);
  return passed;
}

export const validatePeppolEn16931R003 = schematronRule(rule, evaluatePeppolEn16931R003);

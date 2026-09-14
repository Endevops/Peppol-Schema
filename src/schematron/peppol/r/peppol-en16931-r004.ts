import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R004',
  level: 'fatal',
  message: "Specification identifier MUST have the value 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0'.",
} as const satisfies SchematronRule;

const CUSTOMIZATION_ID_PREFIX = 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0';

function evaluatePeppolEn16931R004(document: PeppolDocument): boolean {
  const customizationId = typeof document.customizationId === 'string' ? document.customizationId.trim() : '';
  return customizationId.startsWith(CUSTOMIZATION_ID_PREFIX);
}

export const validatePeppolEn16931R004 = schematronRule(rule, evaluatePeppolEn16931R004);

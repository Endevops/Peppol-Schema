import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R004',
  level: 'fatal',
  message: "Specification identifier MUST have the value 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0'.",
} as const satisfies SchematronRule;

const CUSTOMIZATION_ID_PREFIX = 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0';

export function validatePeppolEn16931R004(document: PeppolDocument): SchematronRuleResult {
  const customizationId = typeof document.customizationId === 'string' ? document.customizationId.trim() : '';
  return schematronResult(rule, customizationId.startsWith(CUSTOMIZATION_ID_PREFIX));
}

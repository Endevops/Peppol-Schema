import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { checkCF } from '#/peppol-validations/check-cf.ts';
import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-COMMON-R046',
  level: 'warning',
  message: 'Tax Code (Codice Fiscale) must be stated in the correct format',
} as const satisfies SchematronRule;

const SCHEME_ID = '9907';

function evaluatePeppolCommonR046(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => checkCF(i.id));
  return passed;
}

export const validatePeppolCommonR046 = schematronRule(rule, evaluatePeppolCommonR046);

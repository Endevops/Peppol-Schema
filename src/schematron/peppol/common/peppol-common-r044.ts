import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-COMMON-R044',
  level: 'warning',
  message: 'IPA Code (Codice Univoco Unità Organizzativa) must be stated in the correct format',
} as const satisfies SchematronRule;

const SCHEME_ID = '0201';
const ALLOWED_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function evaluatePeppolCommonR044(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => i.id.length === 6 && i.id.split('').every(c => ALLOWED_CHARACTERS.includes(c)));
  return passed;
}

export const validatePeppolCommonR044 = schematronRule(rule, evaluatePeppolCommonR044);

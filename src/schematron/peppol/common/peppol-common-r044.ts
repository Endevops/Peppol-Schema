import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getIdentifiersWithSchemeId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R044',
  level: 'warning',
  message: 'IPA Code (Codice Univoco Unità Organizzativa) must be stated in the correct format',
} as const satisfies SchematronRule;

const SCHEME_ID = '0201';
const ALLOWED_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function validatePeppolCommonR044(document: PeppolDocument): SchematronRuleResult {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => i.id.length === 6 && i.id.split('').every(c => ALLOWED_CHARACTERS.includes(c)));
  return schematronResult(rule, passed);
}

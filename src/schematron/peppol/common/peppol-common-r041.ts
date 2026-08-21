import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isValidMod11 } from '#/peppol-validations/is-valid-mod11';
import { normalizeSpace } from '#/peppol-validations/normalize-space';
import { getIdentifiersWithSchemeId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R041',
  level: 'fatal',
  message: 'Norwegian organization number MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0192';

export function validatePeppolCommonR041(document: PeppolDocument): SchematronRuleResult {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => /^[0-9]{9}$/.test(normalizeSpace(i.id)) && isValidMod11(normalizeSpace(i.id)));
  return schematronResult(rule, passed);
}

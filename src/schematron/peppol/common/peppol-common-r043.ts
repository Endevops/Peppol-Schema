import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isValidMod97_0208 } from '#/peppol-validations/is-valid-mod97-0208';
import { normalizeSpace } from '#/peppol-validations/normalize-space';
import { getIdentifiersWithSchemeId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R043',
  level: 'fatal',
  message: 'Belgian enterprise number MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0208';

export function validatePeppolCommonR043(document: PeppolDocument): SchematronRuleResult {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => /^[0-9]{10}$/.test(normalizeSpace(i.id)) && isValidMod97_0208(normalizeSpace(i.id)).success);
  return schematronResult(rule, passed);
}

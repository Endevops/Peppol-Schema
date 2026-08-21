import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isValidGLN } from '#/peppol-validations/is-valid-gln';
import { normalizeSpace } from '#/peppol-validations/normalize-space';
import { getIdentifiersWithSchemeId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R040',
  level: 'fatal',
  message: 'GLN must have a valid format according to GS1 rules.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0088';

export function validatePeppolCommonR040(document: PeppolDocument): SchematronRuleResult {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => /^[0-9]+$/.test(normalizeSpace(i.id)) && isValidGLN(normalizeSpace(i.id)).success);
  return schematronResult(rule, passed);
}

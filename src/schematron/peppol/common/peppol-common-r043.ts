import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isValidMod97_0208 } from '#/peppol-validations/is-valid-mod97-0208.ts';
import { normalizeSpace } from '#/peppol-validations/normalize-space.ts';
import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-COMMON-R043',
  level: 'fatal',
  message: 'Belgian enterprise number MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0208';

function evaluatePeppolCommonR043(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => /^[0-9]{10}$/.test(normalizeSpace(i.id)) && isValidMod97_0208(normalizeSpace(i.id)).success);
  return passed;
}

export const validatePeppolCommonR043 = schematronRule(rule, evaluatePeppolCommonR043);

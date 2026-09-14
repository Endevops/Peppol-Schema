import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { isValidGLN } from '#/peppol-validations/is-valid-gln.ts';
import { normalizeSpace } from '#/peppol-validations/normalize-space.ts';
import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-COMMON-R040',
  level: 'fatal',
  message: 'GLN must have a valid format according to GS1 rules.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0088';

function evaluatePeppolCommonR040(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => /^[0-9]+$/.test(normalizeSpace(i.id)) && isValidGLN(normalizeSpace(i.id)).success);
  return passed;
}

export const validatePeppolCommonR040 = schematronRule(rule, evaluatePeppolCommonR040);

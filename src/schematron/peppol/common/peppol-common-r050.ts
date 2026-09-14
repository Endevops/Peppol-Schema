import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isValidABN } from '#/peppol-validations/is-valid-abn';
import { normalizeSpace } from '#/peppol-validations/normalize-space';
import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R050',
  level: 'fatal',
  message: 'Australian Business Number (ABN) MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0151';

function evaluatePeppolCommonR050(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => /^[0-9]{11}$/.test(normalizeSpace(i.id)) && isValidABN(normalizeSpace(i.id)));
  return passed;
}

export const validatePeppolCommonR050 = schematronRule(rule, evaluatePeppolCommonR050);

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R052',
  level: 'warning',
  message: 'Danish chamber of commerce number (P) MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0096';

function evaluatePeppolCommonR052(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => i.id.length === 10 && i.id.replace(/[0-9]/g, '').length === 0);
  return passed;
}

export const validatePeppolCommonR052 = schematronRule(rule, evaluatePeppolCommonR052);

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { checkCF } from '#/peppol-validations/check-cf';
import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R045',
  level: 'warning',
  message: 'Tax Code (Codice Fiscale) must be stated in the correct format',
} as const satisfies SchematronRule;

const SCHEME_ID = '0210';

function evaluatePeppolCommonR045(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => checkCF(i.id));
  return passed;
}

export const validatePeppolCommonR045 = schematronRule(rule, evaluatePeppolCommonR045);

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { checkCF } from '#/peppol-validations/check-cf';
import { getIdentifiersWithSchemeId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R045',
  level: 'warning',
  message: 'Tax Code (Codice Fiscale) must be stated in the correct format',
} as const satisfies SchematronRule;

const SCHEME_ID = '0210';

export function validatePeppolCommonR045(document: PeppolDocument): SchematronRuleResult {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => checkCF(i.id));
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { checkSEOrgnr } from '#/peppol-validations/check-se-orgnr';
import { getIdentifiersWithSchemeId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R049',
  level: 'fatal',
  message: 'Swedish organization number MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0007';

export function validatePeppolCommonR049(document: PeppolDocument): SchematronRuleResult {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => i.id.trim().length === 10 && Number.isFinite(Number(i.id.trim())) && checkSEOrgnr(i.id));
  return schematronResult(rule, passed);
}

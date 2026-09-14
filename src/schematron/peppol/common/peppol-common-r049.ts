import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { checkSEOrgnr } from '#/peppol-validations/check-se-orgnr.ts';
import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-COMMON-R049',
  level: 'fatal',
  message: 'Swedish organization number MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0007';

function evaluatePeppolCommonR049(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => i.id.trim().length === 10 && Number.isFinite(Number(i.id.trim())) && checkSEOrgnr(i.id));
  return passed;
}

export const validatePeppolCommonR049 = schematronRule(rule, evaluatePeppolCommonR049);

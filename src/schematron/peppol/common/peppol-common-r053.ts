import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R053',
  level: 'warning',
  message: 'Danish ERSTORG number (SE) MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0198';

function evaluatePeppolCommonR053(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => i.id.length === 10 && i.id.startsWith('DK') && i.id.slice(2).replace(/[0-9]/g, '').length === 0);
  return passed;
}

export const validatePeppolCommonR053 = schematronRule(rule, evaluatePeppolCommonR053);

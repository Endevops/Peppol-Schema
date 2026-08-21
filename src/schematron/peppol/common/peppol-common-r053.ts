import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getIdentifiersWithSchemeId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R053',
  level: 'warning',
  message: 'Danish ERSTORG number (SE) MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0198';

export function validatePeppolCommonR053(document: PeppolDocument): SchematronRuleResult {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => i.id.length === 10 && i.id.startsWith('DK') && i.id.slice(2).replace(/[0-9]/g, '').length === 0);
  return schematronResult(rule, passed);
}

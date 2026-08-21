import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getIdentifiersWithSchemeId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R042',
  level: 'fatal',
  message: 'Danish organization number (CVR) MUST be stated in the correct format.',
} as const satisfies SchematronRule;

const SCHEME_ID = '0184';

export function validatePeppolCommonR042(document: PeppolDocument): SchematronRuleResult {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => {
    const value = i.id;
    const isDkPrefixed = value.length === 10 && value.startsWith('DK') && value.slice(2).replace(/[0-9]/g, '').length === 0;
    const isDigitsOnly = value.length === 8 && value.replace(/[0-9]/g, '').length === 0;
    return isDkPrefixed || isDigitsOnly;
  });
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { checkPIVAseIT } from '#/peppol-validations/check-piva-se-it';
import { getIdentifiersWithSchemeId, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-COMMON-R047',
  level: 'warning',
  message: 'Italian VAT Code (Partita Iva) must be stated in the correct format',
} as const satisfies SchematronRule;

const SCHEME_ID = '0211';

export function validatePeppolCommonR047(document: PeppolDocument): SchematronRuleResult {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => checkPIVAseIT(i.id));
  return schematronResult(rule, passed);
}

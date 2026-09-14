import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { checkPIVAseIT } from '#/peppol-validations/check-piva-se-it.ts';
import { getIdentifiersWithSchemeId, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-COMMON-R047',
  level: 'warning',
  message: 'Italian VAT Code (Partita Iva) must be stated in the correct format',
} as const satisfies SchematronRule;

const SCHEME_ID = '0211';

function evaluatePeppolCommonR047(document: PeppolDocument): boolean {
  const identifiers = getIdentifiersWithSchemeId(document).filter(i => i.schemeId === SCHEME_ID);
  const passed = identifiers.every(i => checkPIVAseIT(i.id));
  return passed;
}

export const validatePeppolCommonR047 = schematronRule(rule, evaluatePeppolCommonR047);

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification';
import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-009',
  level: 'fatal',
  message:
    'Greek suppliers that send an invoice through the PEPPOL network must use a correct TIN number as an electronic address according to PEPPOL Electronic Address Identifier scheme (schemeID 9933).',
} as const satisfies SchematronRule;

export function validateGrR009(document: PeppolDocument): SchematronRuleResult {
  const supplierCountry = getSupplierCountry(document);
  if (supplierCountry !== 'GR' && supplierCountry !== 'EL') {
    return schematronResult(rule, true);
  }
  const endpointId = document.accountingSupplierParty.endpointId;
  return schematronResult(rule, endpointId?.schemeId === '9933' && greekTinVerification(endpointId.id));
}

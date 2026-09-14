import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification.ts';
import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-009',
  level: 'fatal',
  message:
    'Greek suppliers that send an invoice through the PEPPOL network must use a correct TIN number as an electronic address according to PEPPOL Electronic Address Identifier scheme (schemeID 9933).',
} as const satisfies SchematronRule;

function evaluateGrR009(document: PeppolDocument): boolean {
  const supplierCountry = getSupplierCountry(document);
  if (supplierCountry !== 'GR' && supplierCountry !== 'EL') {
    return true;
  }
  const endpointId = document.accountingSupplierParty.endpointId;
  return endpointId?.schemeId === '9933' && greekTinVerification(endpointId.id);
}

export const validateGrR009 = schematronRule(rule, evaluateGrR009);

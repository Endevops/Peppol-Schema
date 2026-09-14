import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification.ts';
import { getCustomerCountry, getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-010',
  level: 'fatal',
  message:
    'Greek Suppliers that send an invoice through the PEPPOL network to a greek buyer must use a correct TIN number as an electronic address according to PEPPOL Electronic Address Identifier scheme (SchemeID 9933)',
} as const satisfies SchematronRule;

function evaluateGrR010(document: PeppolDocument): boolean {
  const isGreekSupplier = getSupplierCountry(document) === 'GR' || getSupplierCountry(document) === 'EL';
  const isGreekCustomer = getCustomerCountry(document) === 'GR' || getCustomerCountry(document) === 'EL';
  if (!isGreekSupplier || !isGreekCustomer) {
    return true;
  }
  const endpointId = document.accountingCustomerParty.endpointId;
  return endpointId?.schemeId === '9933' && greekTinVerification(endpointId.id);
}

export const validateGrR010 = schematronRule(rule, evaluateGrR010);

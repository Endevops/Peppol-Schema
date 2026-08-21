import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification';
import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-010',
  level: 'fatal',
  message:
    'Greek Suppliers that send an invoice through the PEPPOL network to a greek buyer must use a correct TIN number as an electronic address according to PEPPOL Electronic Address Identifier scheme (SchemeID 9933)',
} as const satisfies SchematronRule;

export function validateGrR010(document: PeppolDocument): SchematronRuleResult {
  const isGreekSupplier = getSupplierCountry(document) === 'GR' || getSupplierCountry(document) === 'EL';
  const isGreekCustomer = getCustomerCountry(document) === 'GR' || getCustomerCountry(document) === 'EL';
  if (!isGreekSupplier || !isGreekCustomer) {
    return schematronResult(rule, true);
  }
  const endpointId = document.accountingCustomerParty.endpointId;
  return schematronResult(rule, endpointId?.schemeId === '9933' && greekTinVerification(endpointId.id));
}

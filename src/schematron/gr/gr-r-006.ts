import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification';
import { getCustomerCountry, getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-006',
  level: 'fatal',
  message: 'Greek Suppliers must provide the VAT number of the buyer, if the buyer is Greek ',
} as const satisfies SchematronRule;

function evaluateGrR006(document: PeppolDocument): boolean {
  const isGreekSupplier = getSupplierCountry(document) === 'GR' || getSupplierCountry(document) === 'EL';
  const isGreekCustomer = getCustomerCountry(document) === 'GR' || getCustomerCountry(document) === 'EL';
  if (!isGreekSupplier || !isGreekCustomer) {
    return true;
  }
  const vatSchemes = document.accountingCustomerParty.partyTaxSchemes?.filter(scheme => scheme.taxSchemeId.id.trim().toUpperCase() === 'VAT') ?? [];
  if (vatSchemes.length !== 1) {
    return false;
  }
  const companyId = vatSchemes[0]?.companyId ?? '';
  return companyId.startsWith('EL') && greekTinVerification(companyId.slice(2));
}

export const validateGrR006 = schematronRule(rule, evaluateGrR006);

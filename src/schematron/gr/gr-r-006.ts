import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification';
import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-006',
  level: 'fatal',
  message: 'Greek Suppliers must provide the VAT number of the buyer, if the buyer is Greek ',
} as const satisfies SchematronRule;

export function validateGrR006(document: PeppolDocument): SchematronRuleResult {
  const isGreekSupplier = getSupplierCountry(document) === 'GR' || getSupplierCountry(document) === 'EL';
  const isGreekCustomer = getCustomerCountry(document) === 'GR' || getCustomerCountry(document) === 'EL';
  if (!isGreekSupplier || !isGreekCustomer) {
    return schematronResult(rule, true);
  }
  const vatSchemes = document.accountingCustomerParty.partyTaxSchemes?.filter(scheme => scheme.taxSchemeId.id.trim().toUpperCase() === 'VAT') ?? [];
  if (vatSchemes.length !== 1) {
    return schematronResult(rule, false);
  }
  const companyId = vatSchemes[0]?.companyId ?? '';
  return schematronResult(rule, companyId.startsWith('EL') && greekTinVerification(companyId.slice(2)));
}

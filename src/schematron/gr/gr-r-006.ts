import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification';
import { getCustomerCountry, getSupplierCountry, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-006',
  level: 'fatal',
  message: 'Greek Suppliers must provide the VAT number of the buyer, if the buyer is Greek ',
} as const satisfies SchematronRule;

const isGreekCountry = (country: string): boolean => country === 'GR' || country === 'EL';

function evaluateGrR006(document: PeppolDocument): boolean {
  if (!isGreekCountry(getSupplierCountry(document)) || !isGreekCountry(getCustomerCountry(document))) {
    return true;
  }
  const vatSchemes = (document.accountingCustomerParty.partyTaxSchemes ?? []).filter(scheme => scheme.taxSchemeId.id.trim().toUpperCase() === 'VAT');
  if (vatSchemes.length !== 1) {
    return false;
  }
  const companyId = vatSchemes[0]?.companyId ?? '';
  return companyId.startsWith('EL') && greekTinVerification(companyId.slice(2));
}

export const validateGrR006 = schematronRule(rule, evaluateGrR006);

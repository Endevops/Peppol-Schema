import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { greekTinVerification } from '#/peppol-validations/greek-tin-verification';
import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-001-2',
  level: 'fatal',
  message:
    "When the Supplier is Greek, the Invoice Id first segment must be a valid TIN Number and match either the Supplier's or the Tax Representative's Tin Number",
} as const satisfies SchematronRule;

export function validateGrR001_2(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const segments = document.id.split('|');
  const firstSegment = segments[0];
  if (!firstSegment || firstSegment.trim().length !== 9) {
    return schematronResult(rule, false);
  }
  const supplierTin = document.accountingSupplierParty.partyTaxSchemes
    ?.find(scheme => scheme.taxSchemeId.id.trim().toUpperCase() === 'VAT')
    ?.companyId.slice(2);
  const taxRepTin = document.taxRepresentativeParty?.partyTaxScheme.companyId.slice(2);
  const matchesTin = firstSegment === supplierTin || firstSegment === taxRepTin;
  return schematronResult(rule, greekTinVerification(firstSegment) && matchesTin);
}

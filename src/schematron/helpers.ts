import type * as z from 'zod/mini';

import type { PeppolDocument, PeppolDocumentLine } from '#/document';
import type { invoicePeriodSchema } from '#/schemas/fields/invoice-period-schema';
import type { taxSubtotalSchema } from '#/schemas/fields/tax-subtotal-schema';
import type { SchematronRuleLevel, SchematronRuleResult } from '#/schematron/types';

import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';
import { countryCodesKeys } from '#/values/country-code.generated';

export type PeppolLine = PeppolDocumentLine;

/**
 * @description Rule metadata shared by all schematron rules.
 */
export interface SchematronRule {
  id: string;
  level: SchematronRuleLevel;
  message: string;
}

/**
 * @description Builds a `SchematronRuleResult` for the given rule.
 */
export function schematronResult(rule: SchematronRule, passed: boolean): SchematronRuleResult {
  return { id: rule.id, level: rule.level, message: rule.message, passed };
}

/**
 * @description Rounds a number to 2 decimals, mirroring the schematron `round(x * 10 * 10) div 100`.
 */
export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * @description Checks that `val` is within `slack` of `exp`, mirroring the schematron `u:slack` function.
 */
export function slack(exp: number, val: number, tolerance: number): boolean {
  return exp + tolerance >= val && exp - tolerance <= val;
}

/**
 * @description Extracts the process number from the business process identifier, mirroring the schematron `$profile` variable. Returns `'Unknown'` when the
 * identifier does not match the expected format.
 */
export function getProfile(document: Pick<PeppolDocument, 'profileId'>): string {
  const profileId = document.profileId;
  if (typeof profileId === 'string' && /^urn:fdc:peppol.eu:2017:poacc:billing:\d{2}:1\.0$/.test(profileId.trim())) {
    return profileId.trim().split(':')[6] ?? 'Unknown';
  }
  return 'Unknown';
}

/**
 * @description Resolves the supplier country from the VAT identifier prefix or the supplier postal address, mirroring the schematron `$supplierCountry` variable.
 */
export function getSupplierCountry(document: PeppolDocument): string {
  const vatScheme = document.accountingSupplierParty.partyTaxSchemes?.find(s => s.taxSchemeId.id === 'VAT');
  const prefix = vatScheme?.companyId?.slice(0, 2);
  if (prefix) {
    return prefix.toUpperCase();
  }
  const taxRep = document.taxRepresentativeParty;
  if (taxRep?.partyTaxScheme.taxSchemeId.id === 'VAT') {
    const taxRepPrefix = taxRep.partyTaxScheme.companyId.slice(0, 2);
    if (taxRepPrefix) {
      return taxRepPrefix.toUpperCase();
    }
  }
  const country = document.accountingSupplierParty.postalAddress.countryCode.identificationCode;
  return country ? country.toUpperCase() : 'XX';
}

/**
 * @description Resolves the customer country from the VAT identifier prefix or the customer postal address, mirroring the schematron `$customerCountry` variable.
 */
export function getCustomerCountry(document: PeppolDocument): string {
  const vatScheme = document.accountingCustomerParty.partyTaxSchemes?.find(s => s.taxSchemeId.id === 'VAT');
  const prefix = vatScheme?.companyId?.slice(0, 2);
  if (prefix) {
    return prefix.toUpperCase();
  }
  const country = document.accountingCustomerParty.postalAddress.countryCode.identificationCode;
  return country ? country.toUpperCase() : 'XX';
}

/**
 * @description Whether the supplier postal address country is Germany, mirroring the schematron `$supplierCountryIsDE` variable.
 */
export function isSupplierGermany(document: PeppolDocument): boolean {
  return document.accountingSupplierParty.postalAddress.countryCode.identificationCode.toUpperCase() === 'DE';
}

/**
 * @description Whether the customer postal address country is Germany, mirroring the schematron `$customerCountryIsDE` variable.
 */
export function isCustomerGermany(document: PeppolDocument): boolean {
  return document.accountingCustomerParty.postalAddress.countryCode.identificationCode.toUpperCase() === 'DE';
}

/**
 * @description Returns the invoice lines or credit note lines of a document.
 */
export function getLines(document: PeppolDocument): Array<PeppolLine> {
  if ('invoiceLines' in document && Array.isArray(document.invoiceLines)) {
    return document.invoiceLines as Array<PeppolLine>;
  }
  if ('creditNoteLines' in document && Array.isArray(document.creditNoteLines)) {
    return document.creditNoteLines as Array<PeppolLine>;
  }
  return [];
}

/**
 * @description Returns the line quantity (invoiced or credited quantity) of a line, defaulting to 1.
 */
export function getLineQuantity(line: PeppolLine): number {
  const quantity = 'invoicedQuantity' in line ? line.invoicedQuantity : 'creditedQuantity' in line ? line.creditedQuantity : undefined;
  return quantity ? quantity.value : 1;
}

/**
 * @description Returns all document level and line level allowance/charges of a document.
 */
export function getAllAllowanceCharges(
  document: PeppolDocument
): Array<{
  amount: number | undefined;
  allowanceChargeReason: string | undefined;
  baseAmount: number | undefined;
  chargeIndicator: boolean | undefined;
  multiplierFactorNumeric: number | undefined;
  reasonCode: string | undefined;
  taxCategoryId: string | undefined;
}> {
  const documentLevel = (document.allowanceCharges ?? []).map(ac => ({
    allowanceChargeReason: ac.allowanceChargeReason,
    amount: ac.amount?.value,
    baseAmount: ac.baseAmount?.value,
    chargeIndicator: ac.chargeIndicator,
    multiplierFactorNumeric: ac.multiplierFactorNumeric,
    reasonCode: ac.allowanceChargeReasonCode,
    taxCategoryId: ac.taxCategory?.id,
  }));
  const lineLevel = getLines(document).flatMap(line =>
    (line.allowanceCharges ?? []).map(ac => ({
      allowanceChargeReason: ac.allowanceChargeReason,
      amount: ac.amount?.value,
      baseAmount: ac.baseAmount?.value,
      chargeIndicator: ac.chargeIndicator,
      multiplierFactorNumeric: ac.multiplierFactorNumeric,
      reasonCode: ac.allowanceChargeReasonCode,
      taxCategoryId: undefined,
    }))
  );
  return [...documentLevel, ...lineLevel];
}

/**
 * @description Whether a VAT breakdown group (BG-23) contains a VAT category code equal to `code`.
 */
export function hasVatBreakdownCode(document: PeppolDocument, code: string): boolean {
  return document.taxTotals.some(t => t.taxSubtotals?.some(s => s.taxCategory.id === code) ?? false);
}

/**
 * @description Whether the document contains a VAT category code (BT-151, BT-95 or BT-102) equal to `code`.
 */
export function hasVatCategoryCode(document: PeppolDocument, code: string): boolean {
  const lineCategories = getLines(document).some(line => line.item.classifiedTaxCategory.id === code);
  const allowanceCharges = (document.allowanceCharges ?? []).some(ac => ac.taxCategory?.id === code);
  return lineCategories || allowanceCharges;
}

/**
 * @description Resolves the supplier VAT identifier (BT-31) or the seller tax registration identifier (BT-32).
 */
export function getSupplierTaxIdentifiers(document: PeppolDocument): string {
  const companyIds = document.accountingSupplierParty.partyTaxSchemes?.map(scheme => scheme.companyId) ?? [];
  const taxRepCompanyId = document.taxRepresentativeParty?.partyTaxScheme.companyId;
  return [taxRepCompanyId, ...companyIds].filter((v): v is string => typeof v === 'string' && v.trim() !== '').join(',');
}

/**
 * @description Whether the supplier has a VAT identifier (BT-31), a seller tax registration identifier (BT-32) or a tax representative VAT identifier (BT-63).
 */
export function hasSellerTaxIdentifier(document: PeppolDocument): boolean {
  return document.accountingSupplierParty.partyTaxSchemes?.some(scheme => scheme.companyId.trim() !== '') ?? false;
}

/**
 * @description Whether the buyer has a VAT identifier (BT-48) or a legal registration identifier (BT-47).
 */
export function hasBuyerTaxIdentifier(document: PeppolDocument): boolean {
  const buyerVat = document.accountingCustomerParty.partyTaxSchemes?.some(scheme => scheme.companyId.trim() !== '') ?? false;
  const buyerLegal =
    typeof document.accountingCustomerParty.partyLegalEntity.companyId?.id === 'string' &&
    document.accountingCustomerParty.partyLegalEntity.companyId?.id.trim() !== '';
  return buyerVat || buyerLegal;
}

/**
 * @description Whether a number has at most two fraction digits, mirroring the schematron `string-length(substring-after(.,'.'))<=2` checks.
 */
export function hasMaxTwoDecimals(value: number): boolean {
  return Math.abs(Math.round(value * 100) / 100 - value) < 1e-9;
}

/**
 * @description Whether two monetary values are equal, tolerating floating point drift of parsed decimals.
 */
export function amountsEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-9;
}

/**
 * @description Counts the VAT breakdown groups (BG-23) whose VAT category code (BT-118) equals `code`.
 */
export function countVatBreakdownCode(document: PeppolDocument, code: string): number {
  return document.taxTotals.reduce(
    (count, total) => count + (total.taxSubtotals?.filter(subtotal => subtotal.taxCategory.id === code).length ?? 0),
    0
  );
}

/**
 * @description Counts the occurrences of a VAT category code (BT-151, BT-95 or BT-102) on invoice lines and document level allowance/charges.
 */
function countVatCategoryCode(document: PeppolDocument, code: string): number {
  const lines = getLines(document).filter(line => line.item.classifiedTaxCategory.id === code).length;
  const allowanceCharges = (document.allowanceCharges ?? []).filter(ac => ac.taxCategory?.id === code).length;
  return lines + allowanceCharges;
}

/**
 * @description Whether an invoice line (BG-25) carries a VAT category code (BT-151) equal to `code`.
 */
export function hasLineVatCategoryCode(document: PeppolDocument, code: string): boolean {
  return getLines(document).some(line => line.item.classifiedTaxCategory.id === code);
}

/**
 * @description Whether a document level allowance (BG-20) carries a VAT category code (BT-95) equal to `code`.
 */
export function hasDocumentAllowanceVatCategoryCode(document: PeppolDocument, code: string): boolean {
  return (document.allowanceCharges ?? []).some(ac => !ac.chargeIndicator && ac.taxCategory?.id === code);
}

/**
 * @description Whether a document level charge (BG-21) carries a VAT category code (BT-102) equal to `code`.
 */
export function hasDocumentChargeVatCategoryCode(document: PeppolDocument, code: string): boolean {
  return (document.allowanceCharges ?? []).some(ac => ac.chargeIndicator && ac.taxCategory?.id === code);
}

/**
 * @description Whether the supplier has a VAT identifier (BT-31) on a party tax scheme whose tax scheme is "VAT".
 */
export function hasSellerVatCompanyId(document: PeppolDocument): boolean {
  return (
    document.accountingSupplierParty.partyTaxSchemes?.some(
      scheme => scheme.taxSchemeId.id.toUpperCase() === 'VAT' && scheme.companyId.trim() !== ''
    ) ?? false
  );
}

/**
 * @description Whether the buyer has a VAT identifier (BT-48) on a party tax scheme whose tax scheme is "VAT".
 */
export function hasBuyerVatCompanyId(document: PeppolDocument): boolean {
  return (
    document.accountingCustomerParty.partyTaxSchemes?.some(
      scheme => scheme.taxSchemeId.id.toUpperCase() === 'VAT' && scheme.companyId.trim() !== ''
    ) ?? false
  );
}

/**
 * @description Whether the seller tax representative has a VAT identifier (BT-63) on a "VAT" tax scheme.
 */
export function hasTaxRepresentativeVatCompanyId(document: PeppolDocument): boolean {
  const taxRepresentative = document.taxRepresentativeParty;
  if (!taxRepresentative) {
    return false;
  }
  return taxRepresentative.partyTaxScheme.taxSchemeId.id.toUpperCase() === 'VAT' && taxRepresentative.partyTaxScheme.companyId.trim() !== '';
}

/**
 * @description Whether the buyer has a legal registration identifier (BT-47).
 */
export function hasBuyerLegalCompanyId(document: PeppolDocument): boolean {
  const id = document.accountingCustomerParty.partyLegalEntity.companyId?.id;
  return typeof id === 'string' && id.trim() !== '';
}

/**
 * @description Whether every invoice line carrying a VAT category code (BT-151) equal to `code` satisfies `predicate` on its VAT rate (BT-152).
 */
export function everyLineCategoryPercent(document: PeppolDocument, code: string, predicate: (percent: number | undefined) => boolean): boolean {
  return getLines(document).every(line => line.item.classifiedTaxCategory.id !== code || predicate(line.item.classifiedTaxCategory.percent));
}

/**
 * @description Whether every document level allowance carrying a VAT category code (BT-95) equal to `code` satisfies `predicate` on its VAT rate (BT-96).
 */
export function everyDocumentAllowanceCategoryPercent(
  document: PeppolDocument,
  code: string,
  predicate: (percent: number | undefined) => boolean
): boolean {
  return (document.allowanceCharges ?? []).every(ac => ac.chargeIndicator || ac.taxCategory?.id !== code || predicate(ac.taxCategory.percent));
}

/**
 * @description Whether every document level charge carrying a VAT category code (BT-102) equal to `code` satisfies `predicate` on its VAT rate (BT-103).
 */
export function everyDocumentChargeCategoryPercent(
  document: PeppolDocument,
  code: string,
  predicate: (percent: number | undefined) => boolean
): boolean {
  return (document.allowanceCharges ?? []).every(ac => !ac.chargeIndicator || ac.taxCategory?.id !== code || predicate(ac.taxCategory.percent));
}

/**
 * @description Sum of invoice line net amounts (BT-131) plus document level charge amounts (BT-99) minus document level allowance amounts (BT-92) where the VAT
 * category codes (BT-151, BT-102, BT-95) equal `code`.
 */
export function categoryTaxableSum(document: PeppolDocument, code: string): number {
  const lineSum = getLines(document)
    .filter(line => line.item.classifiedTaxCategory.id === code)
    .reduce((sum, line) => sum + line.lineExtensionAmount.value, 0);
  const chargeSum = (document.allowanceCharges ?? [])
    .filter(ac => ac.chargeIndicator && ac.taxCategory?.id === code)
    .reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0);
  const allowanceSum = (document.allowanceCharges ?? [])
    .filter(ac => !ac.chargeIndicator && ac.taxCategory?.id === code)
    .reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0);
  return lineSum + chargeSum - allowanceSum;
}

/**
 * @description Returns the VAT breakdown groups (BG-23) whose VAT category code (BT-118) equals `code`.
 */
export function getTaxSubtotalsWithCode(
  document: PeppolDocument,
  code: string
): Array<{
  taxAmount: number;
  taxableAmount: number;
  taxCategory: { id: string; percent: number | undefined; taxExemptionReason: string | undefined; taxExemptionReasonCode: string | undefined };
}> {
  return document.taxTotals.flatMap(total =>
    (total.taxSubtotals ?? [])
      .filter(subtotal => subtotal.taxCategory.id === code)
      .map(subtotal => ({
        taxAmount: subtotal.taxAmount.value,
        taxableAmount: subtotal.taxableAmount.value,
        taxCategory: {
          id: subtotal.taxCategory.id,
          percent: subtotal.taxCategory.percent,
          taxExemptionReason: subtotal.taxCategory.taxExemptionReason,
          taxExemptionReasonCode: subtotal.taxCategory.taxExemptionReasonCode,
        },
      }))
  );
}

/**
 * @description Sum of invoice line net amounts (BT-131) plus document level charge amounts (BT-99) minus document level allowance amounts (BT-92) where the VAT
 * category codes (BT-151, BT-102, BT-95) equal `code` and the VAT rates (BT-152, BT-103, BT-96) equal `rate`.
 */
function categoryTaxableSumAtRate(document: PeppolDocument, code: string, rate: number): number {
  const lineSum = getLines(document)
    .filter(line => line.item.classifiedTaxCategory.id === code && line.item.classifiedTaxCategory.percent === rate)
    .reduce((sum, line) => sum + line.lineExtensionAmount.value, 0);
  const chargeSum = (document.allowanceCharges ?? [])
    .filter(ac => ac.chargeIndicator && ac.taxCategory?.id === code && ac.taxCategory.percent === rate)
    .reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0);
  const allowanceSum = (document.allowanceCharges ?? [])
    .filter(ac => !ac.chargeIndicator && ac.taxCategory?.id === code && ac.taxCategory.percent === rate)
    .reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0);
  return lineSum + chargeSum - allowanceSum;
}

/**
 * @description Whether the seller has a legal registration identifier (BT-30), used by BR-CO-26.
 */
export function hasSellerLegalCompanyId(document: PeppolDocument): boolean {
  const id = document.accountingSupplierParty.partyLegalEntity.companyId?.id;
  return typeof id === 'string' && id.trim() !== '';
}

/**
 * @description Whether every ISO 3166-1 alpha-2 country code present on the document equals `code`, used by BR-B-01.
 */
export function everyCountryCodeIs(document: PeppolDocument, code: string): boolean {
  const codes = [
    document.accountingSupplierParty.postalAddress.countryCode.identificationCode,
    document.accountingCustomerParty.postalAddress.countryCode.identificationCode,
    document.taxRepresentativeParty?.postalAddress.countryCode.identificationCode,
    document.delivery?.deliveryLocation?.address?.countryCode.identificationCode,
    ...getLines(document)
      .map(line => line.item.originCountryCode?.identificationCode)
      .filter((v): v is string => typeof v === 'string'),
  ].filter((v): v is string => typeof v === 'string' && v.trim() !== '');
  return codes.every(value => value.toUpperCase() === code);
}

/**
 * @description Whether every VAT identifier (BT-31, BT-63, BT-48) carries a country prefix from the ISO 3166-1 alpha-2 list (including EL), used by BR-CO-09.
 */
export function allVatCompanyIdsHaveValidPrefix(document: PeppolDocument): boolean {
  const companyIds: Array<string> = [];
  const pushVatIds = (schemes: Array<{ companyId: string; taxSchemeId: { id: string } }> | undefined) => {
    for (const scheme of schemes ?? []) {
      if (scheme.taxSchemeId.id.toUpperCase() === 'VAT' && scheme.companyId.trim() !== '') {
        companyIds.push(scheme.companyId.trim());
      }
    }
  };
  pushVatIds(document.accountingSupplierParty.partyTaxSchemes);
  pushVatIds(document.accountingCustomerParty.partyTaxSchemes);
  if (
    document.taxRepresentativeParty?.partyTaxScheme.taxSchemeId.id.toUpperCase() === 'VAT' &&
    document.taxRepresentativeParty.partyTaxScheme.companyId.trim() !== ''
  ) {
    companyIds.push(document.taxRepresentativeParty.partyTaxScheme.companyId.trim());
  }
  return companyIds.every(id => (countryCodesKeys as ReadonlyArray<string>).includes(id.slice(0, 2)));
}

/**
 * @description Whether every invoice period / line period has an end date after or equal to its start date, used by BR-29 and BR-30.
 */
export function everyPeriodEndAfterStart(document: PeppolDocument): boolean {
  const ok = (period: z.infer<typeof invoicePeriodSchema> | undefined): boolean => {
    if (!period?.startDate || !period.endDate) {
      return true;
    }
    return period.endDate >= period.startDate;
  };
  const lineOk = getLines(document).every(line => ok(line.invoicePeriod));
  return ok(document.invoicePeriod) && lineOk;
}

/**
 * @description Whether every invoice period has a start/end date or a description code, used by BR-CO-19 and BR-CO-20.
 */
export function everyPeriodHasDateOrDescriptionCode(document: PeppolDocument): boolean {
  const ok = (period: z.infer<typeof invoicePeriodSchema> | undefined): boolean => {
    if (!period) {
      return true;
    }
    return typeof period.startDate === 'string' || typeof period.endDate === 'string' || typeof period.descriptionCode === 'string';
  };
  const lineOk = getLines(document).every(line => ok(line.invoicePeriod));
  return ok(document.invoicePeriod) && lineOk;
}

/**
 * @description Whether the note subject code, when present, is coded using UNTDID 4451, used by BR-CL-08.
 */
export function noteSubjectCodeIsUncl4451(document: PeppolDocument): boolean {
  const note = document.note;
  if (typeof note !== 'string' || !note.includes('#')) {
    return true;
  }
  const subject = note.split('#')[1] ?? '';
  if (subject.length !== 3) {
    return true;
  }
  return (chargeReasonCodesKeys as ReadonlyArray<string>).includes(subject);
}

/**
 * @description Total number of VAT breakdown groups (BG-23) present on the document.
 */
export function countAllVatBreakdowns(document: PeppolDocument): number {
  return document.taxTotals.reduce((count, total) => count + (total.taxSubtotals?.length ?? 0), 0);
}

/**
 * @description Whether the document contains a VAT category code (BT-151, BT-95, BT-102) or a VAT breakdown category code (BT-118) equal to `code`.
 */
export function hasAnyVatCategoryCode(document: PeppolDocument, code: string): boolean {
  return countVatCategoryCode(document, code) > 0 || countVatBreakdownCode(document, code) > 0;
}

/**
 * @description Whether `a` and `b` are within 1 of each other, mirroring the schematron slack used by BR-S-08, BR-AF-08 and BR-AG-08.
 */
export function withinSlackOne(a: number, b: number): boolean {
  return Math.abs(a - b) < 1;
}

/**
 * @description Whether the VAT category tax amount (BT-117) equals the VAT category taxable amount (BT-116) multiplied by the VAT category rate (BT-119), allowing
 * for a slack of 1, mirroring BR-CO-17.
 */
export function vatCategoryTaxAmountMatchesRate(subtotal: z.infer<typeof taxSubtotalSchema>): boolean {
  const percent = subtotal.taxCategory.percent;
  if (percent === undefined) {
    return Math.round(subtotal.taxAmount.value) === 0;
  }
  if (Math.round(percent) === 0) {
    return Math.round(subtotal.taxAmount.value) === 0;
  }
  const expected = round2(Math.abs(subtotal.taxableAmount.value) * (percent / 100));
  const actual = Math.abs(subtotal.taxAmount.value);
  return withinSlackOne(actual, expected);
}

/**
 * @description Whether every VAT breakdown (BG-23) whose VAT category code (BT-118) is "Standard rated", "IGIC" or "IPSI" has a VAT category taxable amount
 * (BT-116) that equals the sum of invoice line net amounts (BT-131) plus document level charge amounts (BT-99) minus document level allowance amounts
 * (BT-92) at the same VAT rate, allowing a slack of 1, mirroring BR-S-08, BR-AF-08 and BR-AG-08.
 */
export function everyVatBreakdownTaxableMatchesRateSum(document: PeppolDocument): boolean {
  for (const total of document.taxTotals) {
    for (const subtotal of total.taxSubtotals ?? []) {
      const code = subtotal.taxCategory.id;
      if (code !== 'S' && code !== 'L' && code !== 'M') {
        continue;
      }
      const rate = subtotal.taxCategory.percent;
      if (rate === undefined) {
        return false;
      }
      if (!withinSlackOne(subtotal.taxableAmount.value, categoryTaxableSumAtRate(document, code, rate))) {
        return false;
      }
    }
  }
  return true;
}

/**
 * @description Returns all identifiers carrying a scheme identifier, used by the PEPPOL-COMMON-R* rules.
 */
export function getIdentifiersWithSchemeId(document: PeppolDocument): Array<{ id: string; schemeId: string }> {
  const result: Array<{ id: string; schemeId: string }> = [];
  const push = (id: string | undefined, schemeId: string | undefined) => {
    if (id && schemeId) {
      result.push({ id, schemeId });
    }
  };
  for (const party of [document.accountingSupplierParty, document.accountingCustomerParty]) {
    push(party.endpointId?.id, party.endpointId?.schemeId);
    push(party.partyIdentification?.id?.id, party.partyIdentification?.id?.schemeId);
    push(party.partyLegalEntity.companyId?.id, party.partyLegalEntity.companyId?.schemeId);
  }
  if (document.payeeParty?.partyIdentification?.id) {
    push(document.payeeParty.partyIdentification.id.id, document.payeeParty.partyIdentification.id.schemeId);
  }
  return result;
}

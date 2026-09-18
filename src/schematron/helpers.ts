import { Effect, Predicate, String } from 'effect';

import type { PeppolInvoicePeriod } from '#/schemas/fields/peppol-invoice-period-schema.ts';
import type { PeppolDocument, PeppolDocumentLine } from '#/schemas/peppol-document-schema.ts';
import type { SchematronFieldIssue, SchematronRuleLevel } from '#/schematron/types.ts';

import { SchematronRuleError } from '#/schematron/errors.ts';
import { chargeReasonCodesKeys } from '#/values/charge-reason-codes.generated';
import { countryCodesKeys } from '#/values/country-code.generated';

/**
 * @description Rule metadata shared by all schematron rules.
 */
export interface SchematronRule {
  /**
   * @description The rule identifier, for example `PEPPOL-EN16931-R001`.
   */
  id: string;
  /**
   * @description The severity of the rule, mirroring the schematron `flag` attribute.
   */
  level: SchematronRuleLevel;
  /**
   * @description Human readable reason reported when the rule fails.
   */
  message: string;
}

/**
 * @description An effectful schematron rule validator. Fails with a `SchematronRuleError` when the document does not satisfy the rule.
 *
 * @example
 *   ```ts
 *   const validate: SchematronDocumentValidator = schematronRule(metadata, document => document.taxTotals.length > 0);
 *   ```;
 *
 * @see {@link schematronRule}
 */
export type SchematronDocumentValidator = (document: PeppolDocument) => Effect.Effect<void, SchematronRuleError>;

/**
 * @description A pure schematron predicate. Returning `true` passes the rule, `false` fails it without field details, and a non-empty array fails it while
 * attaching the reported {@link SchematronFieldIssue} entries.
 */
export type SchematronRulePredicate = (document: PeppolDocument) => boolean | ReadonlyArray<SchematronFieldIssue>;

/**
 * @description Builds an effectful validator from rule metadata and a pure predicate.
 *
 * @example
 *   ```ts
 *   const metadata: SchematronRule = { id: 'PEPPOL-EN16931-R001', level: 'fatal', message: 'The document must carry a number.' };
 *   const validate = schematronRule(metadata, document => document.taxTotals.length > 0);
 *   ```;
 *
 * @param rule - The rule identifier, severity and message reported on failure.
 * @param predicate - The pure check applied to the document; returning `false` fails the rule with no `fields`, while a non-empty array fails it and
 *   is attached as `fields`.
 *
 * @returns A {@link SchematronDocumentValidator} that succeeds for a passing document and fails with a `SchematronRuleError` otherwise.
 *
 * @see {@link SchematronRule}
 * @see {@link SchematronRulePredicate}
 */
export function schematronRule(rule: SchematronRule, predicate: SchematronRulePredicate): SchematronDocumentValidator {
  return Effect.fn(`schematron.${rule.id}`)(function* (document: PeppolDocument) {
    const result = predicate(document);
    if (result === true) {
      return;
    }
    if (result === false) {
      return yield* new SchematronRuleError({ id: rule.id, level: rule.level, message: rule.message });
    }
    if (result.length > 0) {
      return yield* new SchematronRuleError({ id: rule.id, level: rule.level, message: rule.message, fields: result });
    }
  });
}

/**
 * @description Rounds a number to 2 decimals, mirroring the schematron `round(x * 10 * 10) div 100`.
 *
 * @example
 *   ```ts
 *   round2(1.2345); // 1.23
 *   ```;
 *
 * @param value - The number to round.
 *
 * @returns The value rounded to 2 decimals.
 */
export function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * @description Checks that `val` is within `slack` of `exp`, mirroring the schematron `u:slack` function.
 *
 * @example
 *   ```ts
 *   slack(100, 100.5, 1); // true
 *   ```;
 *
 * @param exp - The expected value, the centre of the accepted range.
 * @param val - The actual value to test.
 * @param tolerance - The absolute slack allowed on either side of `exp`.
 *
 * @returns `true` when `val` is within `tolerance` of `exp`, otherwise `false`.
 */
export function slack(exp: number, val: number, tolerance: number): boolean {
  return exp + tolerance >= val && exp - tolerance <= val;
}

/**
 * @description Extracts the process number from the business process identifier, mirroring the schematron `$profile` variable. Returns `'Unknown'` when the
 * identifier does not match the expected format.
 *
 * @example
 *   ```ts
 *   getProfile(document); // '01'
 *   ```;
 *
 * @param document - The document whose `profileId` is read.
 *
 * @returns The two digit process number, for example `'01'`, or `'Unknown'` when the identifier does not match the expected billing profile format.
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
 *
 * @example
 *   ```ts
 *   getSupplierCountry(document); // 'IT'
 *   ```;
 *
 * @param document - The document whose supplier VAT identifiers and postal address are read.
 *
 * @returns The upper case ISO 3166-1 alpha-2 country code, defaulting to `'XX'` when neither the VAT prefix nor the postal address provides one.
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
  return country ? String.toUpperCase(country) : 'XX';
}

/**
 * @description Resolves the customer country from the VAT identifier prefix or the customer postal address, mirroring the schematron `$customerCountry` variable.
 *
 * @example
 *   ```ts
 *   getCustomerCountry(document); // 'DE'
 *   ```;
 *
 * @param document - The document whose customer VAT identifiers and postal address are read.
 *
 * @returns The upper case ISO 3166-1 alpha-2 country code, defaulting to `'XX'` when neither the VAT prefix nor the postal address provides one.
 */
export function getCustomerCountry(document: PeppolDocument): string {
  const vatScheme = document.accountingCustomerParty.partyTaxSchemes?.find(s => s.taxSchemeId.id === 'VAT');
  const prefix = vatScheme?.companyId?.slice(0, 2);
  if (prefix) {
    return prefix.toUpperCase();
  }
  const country = document.accountingCustomerParty.postalAddress.countryCode.identificationCode;
  return country ? String.toUpperCase(country) : 'XX';
}

/**
 * @description Whether the supplier postal address country is Germany, mirroring the schematron `$supplierCountryIsDE` variable.
 *
 * @example
 *   ```ts
 *   isSupplierGermany(document); // false
 *   ```;
 *
 * @param document - The document whose supplier postal address is read.
 *
 * @returns `true` when the supplier postal address country code is `DE`, otherwise `false`.
 */
export function isSupplierGermany(document: PeppolDocument): boolean {
  return document.accountingSupplierParty.postalAddress.countryCode.identificationCode.toUpperCase() === 'DE';
}

/**
 * @description Whether the customer postal address country is Germany, mirroring the schematron `$customerCountryIsDE` variable.
 *
 * @example
 *   ```ts
 *   isCustomerGermany(document); // false
 *   ```;
 *
 * @param document - The document whose customer postal address is read.
 *
 * @returns `true` when the customer postal address country code is `DE`, otherwise `false`.
 */
export function isCustomerGermany(document: PeppolDocument): boolean {
  return document.accountingCustomerParty.postalAddress.countryCode.identificationCode.toUpperCase() === 'DE';
}

/**
 * @description Whether both the supplier and customer countries are Denmark, mirroring the schematron `$supplierCountryIsDK` and `$customerCountryIsDK` variables.
 *
 * @example
 *   ```ts
 *   isDanishSupplierAndCustomer(document); // true
 *   ```;
 *
 * @param document - The document whose supplier and customer countries are read.
 *
 * @returns `true` when both {@link getSupplierCountry} and {@link getCustomerCountry} return `DK`, otherwise `false`.
 */
export function isDanishSupplierAndCustomer(document: PeppolDocument): boolean {
  return getSupplierCountry(document) === 'DK' && getCustomerCountry(document) === 'DK';
}

/**
 * @description Whether both the supplier and customer postal address countries are Germany, mirroring the schematron `$supplierCountryIsDE` and
 * `$customerCountryIsDE` variables.
 *
 * @example
 *   ```ts
 *   isGermanSupplierAndCustomer(document); // true
 *   ```;
 *
 * @param document - The document whose supplier and customer postal addresses are read.
 *
 * @returns `true` when both postal address country codes are `DE`, otherwise `false`.
 */
export function isGermanSupplierAndCustomer(document: PeppolDocument): boolean {
  return isSupplierGermany(document) && isCustomerGermany(document);
}

/**
 * @description Returns the invoice lines or credit note lines of a document.
 *
 * @example
 *   ```ts
 *   getLines(document).length; // 3
 *   ```;
 *
 * @param document - The invoice or credit note whose lines are read.
 *
 * @returns The `invoiceLines` or `creditNoteLines` array, or an empty array when the document carries neither.
 */
export function getLines(document: PeppolDocument): Array<PeppolDocumentLine> {
  if ('invoiceLines' in document && Array.isArray(document.invoiceLines)) {
    return document.invoiceLines as Array<PeppolDocumentLine>;
  }
  if ('creditNoteLines' in document && Array.isArray(document.creditNoteLines)) {
    return document.creditNoteLines as Array<PeppolDocumentLine>;
  }
  return [];
}

/**
 * @description Returns the name of the lines array carried by a document, mirroring the precedence of {@link getLines}.
 *
 * @example
 *   ```ts
 *   getLinesArrayName(document); // 'invoiceLines'
 *   ```;
 *
 * @param document - The invoice or credit note whose lines array name is read.
 *
 * @returns `'invoiceLines'` when the document carries invoice lines, otherwise `'creditNoteLines'`.
 */
export function getLinesArrayName(document: PeppolDocument): 'creditNoteLines' | 'invoiceLines' {
  if ('invoiceLines' in document && Array.isArray(document.invoiceLines)) {
    return 'invoiceLines';
  }
  return 'creditNoteLines';
}

/**
 * @description Returns the line quantity (invoiced or credited quantity) of a line, defaulting to 1.
 *
 * @example
 *   ```ts
 *   getLineQuantity(line); // 2
 *   ```;
 *
 * @param line - The invoice or credit note line whose quantity is read.
 *
 * @returns The `invoicedQuantity` or `creditedQuantity` value, or `1` when the line carries neither.
 */
export function getLineQuantity(line: PeppolDocumentLine): number {
  const quantity = 'invoicedQuantity' in line ? line.invoicedQuantity : 'creditedQuantity' in line ? line.creditedQuantity : undefined;
  return quantity ? quantity.value : 1;
}

/**
 * @description Returns all document level and line level allowance/charges of a document.
 *
 * @example
 *   ```ts
 *   getAllAllowanceCharges(document).length; // 2
 *   ```;
 *
 * @param document - The document whose document level and line level allowance/charges are collected.
 *
 * @returns Every allowance and charge as a flat array of normalised records, document level entries first.
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
 *
 * @example
 *   ```ts
 *   hasVatBreakdownCode(document, 'S'); // true
 *   ```;
 *
 * @param document - The document whose VAT breakdown groups (BG-23) are read.
 * @param code - The VAT category code (BT-118) to look for, for example `'S'`.
 *
 * @returns `true` when any VAT breakdown group carries `code`, otherwise `false`.
 */
export function hasVatBreakdownCode(document: PeppolDocument, code: string): boolean {
  return document.taxTotals.some(t => t.taxSubtotals?.some(s => s.taxCategory.id === code) ?? false);
}

/**
 * @description Whether the document contains a VAT category code (BT-151, BT-95 or BT-102) equal to `code`.
 *
 * @example
 *   ```ts
 *   hasVatCategoryCode(document, 'S'); // true
 *   ```;
 *
 * @param document - The document whose lines and document level allowance/charges are read.
 * @param code - The VAT category code (BT-151, BT-95 or BT-102) to look for.
 *
 * @returns `true` when any line or document level allowance/charge carries `code`, otherwise `false`.
 */
export function hasVatCategoryCode(document: PeppolDocument, code: string): boolean {
  const lineCategories = getLines(document).some(line => line.item.classifiedTaxCategory.id === code);
  const allowanceCharges = (document.allowanceCharges ?? []).some(ac => ac.taxCategory?.id === code);
  return lineCategories || allowanceCharges;
}

/**
 * @description Resolves the supplier VAT identifier (BT-31) or the seller tax registration identifier (BT-32).
 *
 * @example
 *   ```ts
 *   getSupplierTaxIdentifiers(document); // 'IT00743110157'
 *   ```;
 *
 * @param document - The document whose supplier party tax schemes are read.
 *
 * @returns The comma separated supplier and tax representative identifiers, or an empty string when none is present.
 */
export function getSupplierTaxIdentifiers(document: PeppolDocument): string {
  const companyIds = document.accountingSupplierParty.partyTaxSchemes?.map(scheme => scheme.companyId) ?? [];
  const taxRepCompanyId = document.taxRepresentativeParty?.partyTaxScheme.companyId;
  return [taxRepCompanyId, ...companyIds].filter((v): v is string => typeof v === 'string' && v.trim() !== '').join(',');
}

/**
 * @description Whether the supplier has a VAT identifier (BT-31), a seller tax registration identifier (BT-32) or a tax representative VAT identifier (BT-63).
 *
 * @example
 *   ```ts
 *   hasSellerTaxIdentifier(document); // true
 *   ```;
 *
 * @param document - The document whose supplier party tax schemes are read.
 *
 * @returns `true` when the supplier carries at least one non-empty company identifier, otherwise `false`.
 */
export function hasSellerTaxIdentifier(document: PeppolDocument): boolean {
  return document.accountingSupplierParty.partyTaxSchemes?.some(scheme => scheme.companyId.trim() !== '') ?? false;
}

/**
 * @description Whether the buyer has a VAT identifier (BT-48) or a legal registration identifier (BT-47).
 *
 * @example
 *   ```ts
 *   hasBuyerTaxIdentifier(document); // false
 *   ```;
 *
 * @param document - The document whose buyer party tax schemes and legal entity are read.
 *
 * @returns `true` when the buyer carries a VAT identifier (BT-48) or a legal registration identifier (BT-47), otherwise `false`.
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
 *
 * @example
 *   ```ts
 *   hasMaxTwoDecimals(1.25); // true
 *   hasMaxTwoDecimals(1.255); // false
 *   ```;
 *
 * @param value - The number to inspect.
 *
 * @returns `true` when the value has at most two fraction digits, otherwise `false`.
 */
export function hasMaxTwoDecimals(value: number): boolean {
  return Math.abs(Math.round(value * 100) / 100 - value) < 1e-9;
}

/**
 * @description Whether two monetary values are equal, tolerating floating point drift of parsed decimals.
 *
 * @example
 *   ```ts
 *   amountsEqual(100, 100.0000000001); // true
 *   ```;
 *
 * @param a - The first monetary value.
 * @param b - The second monetary value.
 *
 * @returns `true` when the two values differ by less than `1e-9`, otherwise `false`.
 */
export function amountsEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-9;
}

/**
 * @description Builds a {@link SchematronFieldIssue} describing one field compared by a schematron rule.
 *
 * @example
 *   ```ts
 *   fieldIssue('taxTotals[0].taxAmount.value', 100, 90);
 *   ```;
 *
 * @param path - Path to the field within the PeppolDocument.
 * @param expected - The value the rule requires at `path`, or `null` when there is no single required value.
 * @param actual - The value found at `path`, or `null` when the field is absent.
 *
 * @returns The field issue carrying the path, required value and found value.
 */
export function fieldIssue(path: string, expected: SchematronFieldIssue['expected'], actual: SchematronFieldIssue['actual']): SchematronFieldIssue {
  return { path, expected, actual };
}

/**
 * @description Compares an aggregate field against the sum of its component fields, reporting the aggregate and every component when they differ.
 *
 * @example
 *   ```ts
 *   sumFieldIssues({
 *     aggregate: { path: 'legalMonetaryTotal.taxExclusiveAmount.value', actual: 100 },
 *     components: [
 *       { path: 'invoiceLines[0].lineExtensionAmount.value', actual: 60 },
 *       { path: 'invoiceLines[1].lineExtensionAmount.value', actual: 30 },
 *     ],
 *   });
 *   ```;
 *
 * @param params.aggregate - The field expected to equal the component sum.
 * @param params.components - The operand fields summed into the expected aggregate; a component may override its contribution.
 * @param params.isEqual - Equality check for the aggregate and the expected sum; defaults to {@link amountsEqual}.
 *
 * @returns An empty array when the aggregate equals the expected sum, otherwise the aggregate issue followed by one issue per component.
 */
export function sumFieldIssues(params: {
  aggregate: { path: string; actual: number | undefined };
  components: ReadonlyArray<{ path: string; actual: number | undefined; contribution?: number }>;
  isEqual?: (actual: number, expected: number) => boolean;
}): ReadonlyArray<SchematronFieldIssue> {
  const isEqual = params.isEqual ?? amountsEqual;
  const expected = params.components.reduce((sum, component) => sum + (component.contribution ?? component.actual ?? 0), 0);
  if (isEqual(params.aggregate.actual ?? 0, expected)) {
    return [];
  }
  return [
    fieldIssue(params.aggregate.path, expected, params.aggregate.actual ?? null),
    ...params.components.map(component => fieldIssue(component.path, null, component.actual ?? null)),
  ];
}

/**
 * @description Counts the VAT breakdown groups (BG-23) whose VAT category code (BT-118) equals `code`.
 *
 * @example
 *   ```ts
 *   countVatBreakdownCode(document, 'S'); // 1
 *   ```;
 *
 * @param document - The document whose VAT breakdown groups (BG-23) are counted.
 * @param code - The VAT category code (BT-118) to count.
 *
 * @returns The number of VAT breakdown groups carrying `code`.
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
 *
 * @example
 *   ```ts
 *   hasLineVatCategoryCode(document, 'S'); // true
 *   ```;
 *
 * @param document - The document whose invoice lines (BG-25) are read.
 * @param code - The VAT category code (BT-151) to look for.
 *
 * @returns `true` when any invoice line carries `code`, otherwise `false`.
 */
export function hasLineVatCategoryCode(document: PeppolDocument, code: string): boolean {
  return getLines(document).some(line => line.item.classifiedTaxCategory.id === code);
}

/**
 * @description Whether a document level allowance (BG-20) carries a VAT category code (BT-95) equal to `code`.
 *
 * @example
 *   ```ts
 *   hasDocumentAllowanceVatCategoryCode(document, 'S'); // false
 *   ```;
 *
 * @param document - The document whose document level allowances (BG-20) are read.
 * @param code - The VAT category code (BT-95) to look for.
 *
 * @returns `true` when any document level allowance carries `code`, otherwise `false`.
 */
export function hasDocumentAllowanceVatCategoryCode(document: PeppolDocument, code: string): boolean {
  return (document.allowanceCharges ?? []).some(ac => !ac.chargeIndicator && ac.taxCategory?.id === code);
}

/**
 * @description Whether a document level charge (BG-21) carries a VAT category code (BT-102) equal to `code`.
 *
 * @example
 *   ```ts
 *   hasDocumentChargeVatCategoryCode(document, 'S'); // false
 *   ```;
 *
 * @param document - The document whose document level charges (BG-21) are read.
 * @param code - The VAT category code (BT-102) to look for.
 *
 * @returns `true` when any document level charge carries `code`, otherwise `false`.
 */
export function hasDocumentChargeVatCategoryCode(document: PeppolDocument, code: string): boolean {
  return (document.allowanceCharges ?? []).some(ac => ac.chargeIndicator && ac.taxCategory?.id === code);
}

/**
 * @description Whether the supplier has a VAT identifier (BT-31) on a party tax scheme whose tax scheme is "VAT".
 *
 * @example
 *   ```ts
 *   hasSellerVatCompanyId(document); // true
 *   ```;
 *
 * @param document - The document whose supplier party tax schemes are read.
 *
 * @returns `true` when the supplier has a non-empty VAT identifier on a `VAT` tax scheme, otherwise `false`.
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
 *
 * @example
 *   ```ts
 *   hasBuyerVatCompanyId(document); // false
 *   ```;
 *
 * @param document - The document whose buyer party tax schemes are read.
 *
 * @returns `true` when the buyer has a non-empty VAT identifier on a `VAT` tax scheme, otherwise `false`.
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
 *
 * @example
 *   ```ts
 *   hasTaxRepresentativeVatCompanyId(document); // false
 *   ```;
 *
 * @param document - The document whose seller tax representative party is read.
 *
 * @returns `true` when a tax representative exists with a non-empty VAT identifier on a `VAT` tax scheme, otherwise `false`.
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
 *
 * @example
 *   ```ts
 *   hasBuyerLegalCompanyId(document); // false
 *   ```;
 *
 * @param document - The document whose buyer legal entity is read.
 *
 * @returns `true` when the buyer has a non-empty legal registration identifier (BT-47), otherwise `false`.
 */
export function hasBuyerLegalCompanyId(document: PeppolDocument): boolean {
  const id = document.accountingCustomerParty.partyLegalEntity.companyId?.id;
  return typeof id === 'string' && id.trim() !== '';
}

/**
 * @description Whether every invoice line carrying a VAT category code (BT-151) equal to `code` satisfies `predicate` on its VAT rate (BT-152).
 *
 * @example
 *   ```ts
 *   everyLineCategoryPercent(document, 'S', percent => percent !== undefined && percent > 0); // true
 *   ```;
 *
 * @param document - The document whose invoice lines are read.
 * @param code - The VAT category code (BT-151) to match.
 * @param predicate - The check applied to the VAT rate (BT-152) of matching lines.
 *
 * @returns `true` when every matching line satisfies `predicate`, otherwise `false`.
 */
export function everyLineCategoryPercent(document: PeppolDocument, code: string, predicate: (percent: number | undefined) => boolean): boolean {
  return getLines(document).every(line => line.item.classifiedTaxCategory.id !== code || predicate(line.item.classifiedTaxCategory.percent));
}

/**
 * @description Whether every document level allowance carrying a VAT category code (BT-95) equal to `code` satisfies `predicate` on its VAT rate (BT-96).
 *
 * @example
 *   ```ts
 *   everyDocumentAllowanceCategoryPercent(document, 'S', percent => percent === 0); // false
 *   ```;
 *
 * @param document - The document whose document level allowances are read.
 * @param code - The VAT category code (BT-95) to match.
 * @param predicate - The check applied to the VAT rate (BT-96) of matching allowances.
 *
 * @returns `true` when every matching allowance satisfies `predicate`, otherwise `false`.
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
 *
 * @example
 *   ```ts
 *   everyDocumentChargeCategoryPercent(document, 'S', percent => percent === 0); // false
 *   ```;
 *
 * @param document - The document whose document level charges are read.
 * @param code - The VAT category code (BT-102) to match.
 * @param predicate - The check applied to the VAT rate (BT-103) of matching charges.
 *
 * @returns `true` when every matching charge satisfies `predicate`, otherwise `false`.
 */
export function everyDocumentChargeCategoryPercent(
  document: PeppolDocument,
  code: string,
  predicate: (percent: number | undefined) => boolean
): boolean {
  return (document.allowanceCharges ?? []).every(ac => !ac.chargeIndicator || ac.taxCategory?.id !== code || predicate(ac.taxCategory.percent));
}

/**
 * @description Returns the VAT breakdown groups (BG-23) whose VAT category code (BT-118) equals `code`.
 *
 * @example
 *   ```ts
 *   getTaxSubtotalsWithCode(document, 'S').length; // 1
 *   ```;
 *
 * @param document - The document whose VAT breakdown groups are read.
 * @param code - The VAT category code (BT-118) to collect.
 *
 * @returns The matching VAT breakdown groups with their amounts and category details.
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
 * @description Whether the seller has a legal registration identifier (BT-30), used by BR-CO-26.
 *
 * @example
 *   ```ts
 *   hasSellerLegalCompanyId(document); // true
 *   ```;
 *
 * @param document - The document whose supplier legal entity is read.
 *
 * @returns `true` when the supplier has a non-empty legal registration identifier (BT-30), otherwise `false`.
 */
export function hasSellerLegalCompanyId(document: PeppolDocument): boolean {
  const id = document.accountingSupplierParty.partyLegalEntity.companyId?.id;
  return typeof id === 'string' && id.trim() !== '';
}

/**
 * @description Whether every ISO 3166-1 alpha-2 country code present on the document equals `code`, used by BR-B-01.
 *
 * @example
 *   ```ts
 *   everyCountryCodeIs(document, 'DE'); // false
 *   ```;
 *
 * @param document - The document whose country codes are read.
 * @param code - The upper case ISO 3166-1 alpha-2 code to match.
 *
 * @returns `true` when every non-empty country code on the document equals `code`, otherwise `false`.
 */
export function everyCountryCodeIs(document: PeppolDocument, code: string): boolean {
  const codes = [
    document.accountingSupplierParty.postalAddress.countryCode.identificationCode,
    document.accountingCustomerParty.postalAddress.countryCode.identificationCode,
    document.taxRepresentativeParty?.postalAddress.countryCode.identificationCode,
    document.delivery?.deliveryLocation?.address?.countryCode.identificationCode,
    ...getLines(document)
      .map(line => line.item.originCountryCode?.identificationCode)
      .filter(v => Predicate.isString(v)),
  ].filter(<T>(v: T): v is NonNullable<T> => Predicate.isString(v) && String.isNonEmpty(String.trim(v)));
  return codes.every(value => value.toUpperCase() === code);
}

/**
 * @description Whether every VAT identifier (BT-31, BT-63, BT-48) carries a country prefix from the ISO 3166-1 alpha-2 list (including EL), used by BR-CO-09.
 *
 * @example
 *   ```ts
 *   allVatCompanyIdsHaveValidPrefix(document); // true
 *   ```;
 *
 * @param document - The document whose supplier, customer and tax representative VAT identifiers are read.
 *
 * @returns `true` when every VAT identifier starts with a known ISO 3166-1 alpha-2 country code (including `EL`), otherwise `false`.
 */
export function allVatCompanyIdsHaveValidPrefix(document: PeppolDocument): boolean {
  const companyIds: Array<string> = [];
  const pushVatIds = (schemes: ReadonlyArray<{ companyId: string; taxSchemeId: { id: string } }> | undefined) => {
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
 *
 * @example
 *   ```ts
 *   everyPeriodEndAfterStart(document); // true
 *   ```;
 *
 * @param document - The document whose invoice periods and line invoice periods are read.
 *
 * @returns `true` when every period with both dates has an end date on or after its start date, otherwise `false`.
 */
export function everyPeriodEndAfterStart(document: PeppolDocument): boolean {
  const ok = (period: PeppolInvoicePeriod | undefined): boolean => {
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
 *
 * @example
 *   ```ts
 *   everyPeriodHasDateOrDescriptionCode(document); // true
 *   ```;
 *
 * @param document - The document whose invoice periods and line invoice periods are read.
 *
 * @returns `true` when every period has a start date, an end date or a description code, otherwise `false`.
 */
export function everyPeriodHasDateOrDescriptionCode(document: PeppolDocument): boolean {
  const ok = (period: PeppolInvoicePeriod | undefined): boolean => {
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
 *
 * @example
 *   ```ts
 *   noteSubjectCodeIsUncl4451(document); // true
 *   ```;
 *
 * @param document - The document whose note is read.
 *
 * @returns `true` when the note has no subject code, or the subject code is a UNTDID 4451 charge reason code, otherwise `false`.
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
 *
 * @example
 *   ```ts
 *   countAllVatBreakdowns(document); // 1
 *   ```;
 *
 * @param document - The document whose VAT breakdown groups (BG-23) are counted.
 *
 * @returns The total number of VAT breakdown groups.
 */
export function countAllVatBreakdowns(document: PeppolDocument): number {
  return document.taxTotals.reduce((count, total) => count + (total.taxSubtotals?.length ?? 0), 0);
}

/**
 * @description Whether the document contains a VAT category code (BT-151, BT-95, BT-102) or a VAT breakdown category code (BT-118) equal to `code`.
 *
 * @example
 *   ```ts
 *   hasAnyVatCategoryCode(document, 'S'); // true
 *   ```;
 *
 * @param document - The document whose VAT categories and breakdowns are read.
 * @param code - The VAT category code to look for.
 *
 * @returns `true` when the code appears on a line, an allowance/charge or a VAT breakdown group, otherwise `false`.
 */
export function hasAnyVatCategoryCode(document: PeppolDocument, code: string): boolean {
  return countVatCategoryCode(document, code) > 0 || countVatBreakdownCode(document, code) > 0;
}

/**
 * @description Whether `a` and `b` are within 1 of each other, mirroring the schematron slack used by BR-S-08, BR-AF-08 and BR-AG-08.
 *
 * @example
 *   ```ts
 *   withinSlackOne(100, 100.5); // true
 *   ```;
 *
 * @param a - The first value.
 * @param b - The second value.
 *
 * @returns `true` when the two values differ by less than `1`, otherwise `false`.
 */
export function withinSlackOne(a: number, b: number): boolean {
  return Math.abs(a - b) < 1;
}

/**
 * @description Returns all identifiers carrying a scheme identifier, used by the PEPPOL-COMMON-R* rules.
 *
 * @example
 *   ```ts
 *   getIdentifiersWithSchemeId(document); // [{ id: '00743110157', schemeId: '0088' }]
 *   ```;
 *
 * @param document - The document whose supplier, customer and payee identifiers are read.
 *
 * @returns Every identifier that carries both an `id` and a `schemeId`, in supplier, customer then payee order.
 */
export function getIdentifiersWithSchemeId(document: PeppolDocument): Array<{ id: string; schemeId: string }> {
  const candidates: Array<{ id: string | undefined; schemeId: string | undefined }> = [];
  for (const party of [document.accountingSupplierParty, document.accountingCustomerParty]) {
    candidates.push(
      { id: party.endpointId?.id, schemeId: party.endpointId?.schemeId },
      { id: party.partyIdentification?.id?.id, schemeId: party.partyIdentification?.id?.schemeId },
      { id: party.partyLegalEntity.companyId?.id, schemeId: party.partyLegalEntity.companyId?.schemeId }
    );
  }
  const payeeIdentification = document.payeeParty?.partyIdentification?.id;
  if (payeeIdentification) {
    candidates.push({ id: payeeIdentification.id, schemeId: payeeIdentification.schemeId });
  }
  return candidates.filter((candidate): candidate is { id: string; schemeId: string } => Boolean(candidate.id) && Boolean(candidate.schemeId));
}

/**
 * @description A component operand summed into the expected taxable amount of a VAT breakdown group (BG-23), mirroring the operands of the BR-*-08 rules.
 */
type TaxableSumComponent = { path: string; actual: number | undefined; contribution?: number };

/**
 * @description Collects the invoice line net amount (BT-131), document level charge (BT-99) and document level allowance (BT-92) operands whose VAT category
 * matches `matches`. Charges are collected before allowances, mirroring the operand order of the BR-*-08 rules.
 *
 * @param document - The document whose lines and document level allowance/charges are read.
 * @param matches - Predicate on a VAT category code (BT-151, BT-102, BT-95) and VAT rate (BT-152, BT-103, BT-96) selecting the operands.
 *
 * @returns The matching component operands, with charges contributing positively and allowances negatively.
 */
function collectTaxableAmountComponents(
  document: PeppolDocument,
  matches: (categoryId: string | undefined, percent: number | undefined) => boolean
): Array<TaxableSumComponent> {
  const linesName = getLinesArrayName(document);
  const components: Array<TaxableSumComponent> = [];

  getLines(document).forEach((line, lineIndex) => {
    const category = line.item.classifiedTaxCategory;
    if (matches(category.id, category.percent)) {
      components.push({
        path: `${linesName}[${lineIndex}].lineExtensionAmount.value`,
        actual: line.lineExtensionAmount.value,
        contribution: line.lineExtensionAmount.value,
      });
    }
  });
  const allowanceCharges = document.allowanceCharges ?? [];
  allowanceCharges.forEach((allowanceCharge, allowanceChargeIndex) => {
    if (allowanceCharge.chargeIndicator && matches(allowanceCharge.taxCategory?.id, allowanceCharge.taxCategory?.percent)) {
      components.push({
        path: `allowanceCharges[${allowanceChargeIndex}].amount.value`,
        actual: allowanceCharge.amount?.value,
        contribution: allowanceCharge.amount?.value ?? 0,
      });
    }
  });
  allowanceCharges.forEach((allowanceCharge, allowanceChargeIndex) => {
    if (!allowanceCharge.chargeIndicator && matches(allowanceCharge.taxCategory?.id, allowanceCharge.taxCategory?.percent)) {
      components.push({
        path: `allowanceCharges[${allowanceChargeIndex}].amount.value`,
        actual: allowanceCharge.amount?.value,
        contribution: -(allowanceCharge.amount?.value ?? 0),
      });
    }
  });

  return components;
}

/**
 * @description Field issues for the code-only category taxable-sum rules (BR-Z-08, BR-E-08, BR-G-08, BR-O-08, BR-IC-08 and BR-AE-08): the VAT category taxable
 * amount (BT-116) of each VAT breakdown (BG-23) carrying `code` must equal the sum of its matching lines and allowance/charges.
 *
 * @example
 *   ```ts
 *   categoryTaxableSumFieldIssues(document, 'Z');
 *   ```;
 *
 * @param document - The document whose VAT breakdowns (BG-23), lines and allowance/charges are read.
 * @param code - The VAT category code (BT-118) selecting the VAT breakdown groups, for example `'Z'`.
 *
 * @returns An empty array when every matching taxable amount equals its component sum, otherwise one issue per differing subtotal followed by its
 *   operands.
 */
export function categoryTaxableSumFieldIssues(document: PeppolDocument, code: string): ReadonlyArray<SchematronFieldIssue> {
  return document.taxTotals.flatMap((total, totalIndex) =>
    (total.taxSubtotals ?? []).flatMap((subtotal, subtotalIndex) => {
      if (subtotal.taxCategory.id !== code) {
        return [];
      }
      return sumFieldIssues({
        aggregate: { path: `taxTotals[${totalIndex}].taxSubtotals[${subtotalIndex}].taxableAmount.value`, actual: subtotal.taxableAmount.value },
        components: collectTaxableAmountComponents(document, categoryId => categoryId === code),
        isEqual: amountsEqual,
      });
    })
  );
}

/**
 * @description Field issues for the standard-rated, IGIC and IPSI taxable-sum rules (BR-S-08, BR-AF-08 and BR-AG-08): for each VAT category rate (BT-119) where
 * the VAT category code (BT-118) is `S`, `L` or `M`, the VAT category taxable amount (BT-116) must equal the sum of its matching lines and
 * allowance/charges at that rate.
 *
 * @example
 *   ```ts
 *   standardRatedTaxableSumFieldIssues(document);
 *   ```;
 *
 * @param document - The document whose VAT breakdowns (BG-23), lines and allowance/charges are read.
 *
 * @returns An empty array when every matching taxable amount equals its component sum, otherwise one issue per differing subtotal followed by its
 *   operands; a subtotal without a VAT category rate yields the taxable amount issue followed by the missing rate operand.
 */
export function standardRatedTaxableSumFieldIssues(document: PeppolDocument): ReadonlyArray<SchematronFieldIssue> {
  return document.taxTotals.flatMap((total, totalIndex) =>
    (total.taxSubtotals ?? []).flatMap((subtotal, subtotalIndex) => {
      const code = subtotal.taxCategory.id;
      if (code !== 'S' && code !== 'L' && code !== 'M') {
        return [];
      }
      const taxablePath = `taxTotals[${totalIndex}].taxSubtotals[${subtotalIndex}].taxableAmount.value`;
      const percentPath = `taxTotals[${totalIndex}].taxSubtotals[${subtotalIndex}].taxCategory.percent`;
      const rate = subtotal.taxCategory.percent;
      if (rate === undefined) {
        return [fieldIssue(taxablePath, null, subtotal.taxableAmount.value), fieldIssue(percentPath, null, null)];
      }
      const components = collectTaxableAmountComponents(document, (categoryId, percent) => categoryId === code && percent === rate);
      components.push({ path: percentPath, actual: rate, contribution: 0 });
      return sumFieldIssues({ aggregate: { path: taxablePath, actual: subtotal.taxableAmount.value }, components, isEqual: withinSlackOne });
    })
  );
}

/**
 * @description Field issues for the category tax amount rules (BR-S-09, BR-AF-09 and BR-AG-09): the VAT category tax amount (BT-117) of each VAT breakdown (BG-23)
 * carrying `code` must equal its VAT category taxable amount (BT-116) multiplied by its VAT category rate (BT-119), within a slack of one.
 *
 * @example
 *   ```ts
 *   categoryTaxAmountFieldIssues(document, 'S');
 *   ```;
 *
 * @param document - The document whose VAT breakdowns (BG-23) are read.
 * @param code - The VAT category code (BT-118) selecting the VAT breakdown groups, for example `'S'`.
 *
 * @returns An empty array when every matching tax amount is within slack of the computed value, otherwise one issue per differing subtotal followed
 *   by its taxable amount and rate operands.
 */
export function categoryTaxAmountFieldIssues(document: PeppolDocument, code: string): ReadonlyArray<SchematronFieldIssue> {
  return document.taxTotals.flatMap((total, taxTotalIndex) =>
    (total.taxSubtotals ?? []).flatMap((subtotal, taxSubtotalIndex) => {
      if (subtotal.taxCategory.id !== code) {
        return [];
      }
      const actual = subtotal.taxAmount.value;
      const expected = round2(subtotal.taxableAmount.value * ((subtotal.taxCategory.percent ?? 0) / 100));
      if (withinSlackOne(actual, expected)) {
        return [];
      }
      const path = `taxTotals[${taxTotalIndex}].taxSubtotals[${taxSubtotalIndex}]`;
      return [
        fieldIssue(`${path}.taxAmount.value`, expected, actual),
        fieldIssue(`${path}.taxableAmount.value`, null, subtotal.taxableAmount.value),
        fieldIssue(`${path}.taxCategory.percent`, null, subtotal.taxCategory.percent ?? null),
      ];
    })
  );
}

/**
 * @description Field issues for the invoice line net amount rule (PEPPOL-EN16931-R120): each invoice line net amount (BT-131) must equal the invoiced quantity
 * (BT-129) multiplied by the item net price (BT-146) divided by the item price base quantity (BT-149), plus the invoice line charges (BT-141) and
 * minus the invoice line allowances (BT-136), within a slack of `0.02`.
 *
 * @example
 *   ```ts
 *   lineNetAmountFieldIssues(document);
 *   ```;
 *
 * @param document - The document whose lines, prices and line allowance/charges are read.
 *
 * @returns An empty array when every line net amount is within slack of the computed value, otherwise one issue per differing line followed by its
 *   quantity, price, base quantity and allowance/charge operands.
 */
export function lineNetAmountFieldIssues(document: PeppolDocument): ReadonlyArray<SchematronFieldIssue> {
  const linesName = getLinesArrayName(document);
  const issues: Array<SchematronFieldIssue> = [];

  getLines(document).forEach((line, lineIndex) => {
    const lineExtensionAmount = line.lineExtensionAmount.value;
    const quantity = getLineQuantity(line);
    const priceAmount = line.price.priceAmount.value;
    const baseQuantity = line.price.baseQuantity?.value ?? 1;
    const allowanceCharges = line.allowanceCharges ?? [];
    const allowancesTotal = allowanceCharges.filter(ac => !ac.chargeIndicator).reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0);
    const chargesTotal = allowanceCharges.filter(ac => ac.chargeIndicator).reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0);
    const expected = quantity * (priceAmount / baseQuantity) + chargesTotal - allowancesTotal;
    if (slack(expected, lineExtensionAmount, 0.02)) {
      return;
    }
    const path = `${linesName}[${lineIndex}]`;
    const quantityName = 'invoicedQuantity' in line ? 'invoicedQuantity' : 'creditedQuantity';
    issues.push(
      fieldIssue(`${path}.lineExtensionAmount.value`, Number.isFinite(expected) ? expected : null, lineExtensionAmount),
      fieldIssue(`${path}.${quantityName}.value`, null, quantity),
      fieldIssue(`${path}.price.priceAmount.value`, null, priceAmount),
      fieldIssue(`${path}.price.baseQuantity.value`, null, line.price.baseQuantity?.value ?? null),
      ...allowanceCharges.map((allowanceCharge, allowanceChargeIndex) =>
        fieldIssue(`${path}.allowanceCharges[${allowanceChargeIndex}].amount.value`, null, allowanceCharge.amount?.value ?? null)
      )
    );
  });

  return issues;
}

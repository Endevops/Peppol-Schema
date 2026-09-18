import { Effect, Result } from 'effect';
/**
 * @description Unit tests for the shared schematron helper functions.
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';

import { SchematronRuleError } from '#/schematron/errors.ts';
import {
  fieldIssue,
  getAllAllowanceCharges,
  getCustomerCountry,
  getIdentifiersWithSchemeId,
  getLineQuantity,
  getLines,
  getLinesArrayName,
  getProfile,
  getSupplierCountry,
  getSupplierTaxIdentifiers,
  hasBuyerTaxIdentifier,
  hasSellerTaxIdentifier,
  hasVatBreakdownCode,
  hasVatCategoryCode,
  isCustomerGermany,
  isDanishSupplierAndCustomer,
  isGermanSupplierAndCustomer,
  isSupplierGermany,
  round2,
  schematronRule,
  slack,
  sumFieldIssues,
} from '#/schematron/helpers.ts';
import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils.ts';

describe('schematron helpers', () => {
  describe('round2', () => {
    it.each([
      [1, 1],
      [1.006, 1.01],
      [1.004, 1],
      [2.5, 2.5],
      [-1.006, -1.01],
    ])('rounds %s to 2 decimals (%s)', (input, expected) => {
      expect(round2(input as number)).toEqual(expected);
    });
  });

  describe('slack', () => {
    it('returns true when val is within the tolerance of exp', () => {
      expect(slack(10, 10.01, 0.02)).toEqual(true);
      expect(slack(10, 9.99, 0.02)).toEqual(true);
    });

    it('returns false when val is outside the tolerance of exp', () => {
      expect(slack(10, 10.1, 0.02)).toEqual(false);
      expect(slack(10, 9.9, 0.02)).toEqual(false);
    });
  });

  describe('getProfile', () => {
    it('extracts the process number from a valid profile id', () => {
      expect(getProfile({ profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0' })).toEqual('01');
      expect(getProfile({ profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:06:1.0' })).toEqual('06');
    });

    it('returns Unknown for an invalid profile id', () => {
      expect(getProfile({ profileId: 'not-a-profile' })).toEqual('Unknown');
      expect(getProfile({ profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:1.0' })).toEqual('Unknown');
    });
  });

  describe('getSupplierCountry / getCustomerCountry', () => {
    it('resolves the country from the VAT identifier prefix', async () => {
      const document = await decodeBaseExample();
      const altered = {
        ...document,
        accountingSupplierParty: { ...document.accountingSupplierParty, partyTaxSchemes: [{ companyId: 'DE123456789', taxSchemeId: { id: 'VAT' } }] },
        accountingCustomerParty: { ...document.accountingCustomerParty, partyTaxSchemes: [{ companyId: 'FR123456789', taxSchemeId: { id: 'VAT' } }] },
      } as unknown as PeppolDocument;
      expect(getSupplierCountry(altered)).toEqual('DE');
      expect(getCustomerCountry(altered)).toEqual('FR');
    });

    it('falls back to the postal address country', async () => {
      const document = await decodeBaseExample();
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyTaxSchemes: undefined,
          postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'BE' } },
        },
      } as unknown as PeppolDocument;
      expect(getSupplierCountry(altered)).toEqual('BE');
    });
  });

  describe('isSupplierGermany / isCustomerGermany', () => {
    it('returns true only when the postal address country is Germany', async () => {
      const document = await decodeBaseExample();
      expect(isSupplierGermany(document)).toEqual(false);
      expect(isCustomerGermany(document)).toEqual(false);
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'DE' } },
        },
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'DE' } },
        },
      } as unknown as PeppolDocument;
      expect(isSupplierGermany(altered)).toEqual(true);
      expect(isCustomerGermany(altered)).toEqual(true);
    });
  });

  describe('isDanishSupplierAndCustomer / isGermanSupplierAndCustomer', () => {
    const withVatCountries = (document: PeppolDocument, supplier: string, customer: string) =>
      ({
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyTaxSchemes: [{ companyId: `${supplier}12345678`, taxSchemeId: { id: 'VAT' } }],
        },
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          partyTaxSchemes: [{ companyId: `${customer}12345678`, taxSchemeId: { id: 'VAT' } }],
        },
      }) as unknown as PeppolDocument;

    const withPostalCountries = (document: PeppolDocument, supplier: string, customer: string) =>
      ({
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: supplier } },
        },
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: customer } },
        },
      }) as unknown as PeppolDocument;

    it('returns true when both supplier and customer are Danish', async () => {
      const document = await decodeBaseExample();
      expect(isDanishSupplierAndCustomer(withVatCountries(document, 'DK', 'DK'))).toEqual(true);
    });

    it('returns false when the customer is not Danish', async () => {
      const document = await decodeBaseExample();
      expect(isDanishSupplierAndCustomer(withVatCountries(document, 'DK', 'XX'))).toEqual(false);
    });

    it('returns false when the supplier is not Danish', async () => {
      const document = await decodeBaseExample();
      expect(isDanishSupplierAndCustomer(withVatCountries(document, 'XX', 'DK'))).toEqual(false);
    });

    it('returns true when both supplier and customer are German', async () => {
      const document = await decodeBaseExample();
      expect(isGermanSupplierAndCustomer(withPostalCountries(document, 'DE', 'DE'))).toEqual(true);
    });

    it('returns false when the customer is not German', async () => {
      const document = await decodeBaseExample();
      expect(isGermanSupplierAndCustomer(withPostalCountries(document, 'DE', 'FR'))).toEqual(false);
    });

    it('returns false when the supplier is not German', async () => {
      const document = await decodeBaseExample();
      expect(isGermanSupplierAndCustomer(withPostalCountries(document, 'FR', 'DE'))).toEqual(false);
    });
  });

  describe('getLines / getLineQuantity', () => {
    it('returns the invoice lines of an invoice', async () => {
      const document = await decodeBaseExample();
      const lines = getLines(document);
      expect(lines.length).toBeGreaterThan(0);
      expect(getLineQuantity(lines[0] as never)).toBeGreaterThan(0);
    });

    it('returns an empty array when the document has no lines', async () => {
      const document = await decodeBaseExample();
      const { invoiceLines: _invoiceLines, creditNoteLines: _creditNoteLines, ...rest } = document as any;
      expect(getLines(rest as unknown as PeppolDocument)).toEqual([]);
    });

    it('defaults the quantity to 1 when no quantity is present', async () => {
      const document = await decodeBaseExample();
      const lines = getLines(document);
      const line = { ...lines[0], invoicedQuantity: undefined, creditedQuantity: undefined };
      expect(getLineQuantity(line as never)).toEqual(1);
    });
  });

  describe('getAllAllowanceCharges', () => {
    it('collects document and line level allowance/charges', async () => {
      const document = await decodeBaseExample();
      const allowanceCharges = getAllAllowanceCharges(document);
      expect(allowanceCharges.length).toBeGreaterThan(0);
      for (const ac of allowanceCharges) {
        expect(typeof ac.chargeIndicator).toEqual('boolean');
      }
    });
  });

  describe('hasVatBreakdownCode / hasVatCategoryCode', () => {
    it('detects VAT category codes', async () => {
      const document = await decodeBaseExample();
      expect(hasVatBreakdownCode(document, 'S')).toEqual(true);
      expect(hasVatBreakdownCode(document, 'Z')).toEqual(false);
      expect(hasVatCategoryCode(document, 'S')).toEqual(true);
    });
  });

  describe('getSupplierTaxIdentifiers / hasSellerTaxIdentifier / hasBuyerTaxIdentifier', () => {
    it('collects supplier tax identifiers and detects buyer identifiers', async () => {
      const document = await decodeBaseExample();
      expect(getSupplierTaxIdentifiers(document).length).toBeGreaterThan(0);
      expect(hasSellerTaxIdentifier(document)).toEqual(true);
      expect(hasBuyerTaxIdentifier(document)).toEqual(true);
    });

    it('returns empty/false when no identifiers are present', async () => {
      const document = await decodeBaseExample();
      const altered = {
        ...document,
        accountingSupplierParty: {
          ...document.accountingSupplierParty,
          partyTaxSchemes: undefined,
          partyLegalEntity: { ...document.accountingSupplierParty.partyLegalEntity, companyId: undefined },
        },
        accountingCustomerParty: {
          ...document.accountingCustomerParty,
          partyTaxSchemes: undefined,
          partyLegalEntity: { ...document.accountingCustomerParty.partyLegalEntity, companyId: undefined },
        },
      } as unknown as PeppolDocument;
      expect(getSupplierTaxIdentifiers(altered)).toEqual('');
      expect(hasSellerTaxIdentifier(altered)).toEqual(false);
      expect(hasBuyerTaxIdentifier(altered)).toEqual(false);
    });
  });

  describe('getIdentifiersWithSchemeId', () => {
    it('collects identifiers carrying a scheme id', async () => {
      const document = await decodeBaseExample();
      const identifiers = getIdentifiersWithSchemeId(document);
      expect(identifiers.length).toBeGreaterThan(0);
      for (const identifier of identifiers) {
        expect(identifier.id.length).toBeGreaterThan(0);
        expect(identifier.schemeId.length).toBeGreaterThan(0);
      }
    });
  });

  describe('fieldIssue', () => {
    it('builds an issue with the given path, expected and actual values', () => {
      expect(fieldIssue('a.b', 1, 2)).toEqual({ path: 'a.b', expected: 1, actual: 2 });
    });

    it('accepts null expected and actual values', () => {
      expect(fieldIssue('a', null, null)).toEqual({ path: 'a', expected: null, actual: null });
    });

    it('accepts string and boolean values', () => {
      expect(fieldIssue('a', 'x', true)).toEqual({ path: 'a', expected: 'x', actual: true });
    });
  });

  describe('getLinesArrayName', () => {
    it('returns invoiceLines for an invoice', async () => {
      const document = await decodeBaseExample();
      expect(getLinesArrayName(document)).toEqual('invoiceLines');
    });

    it('returns creditNoteLines for a credit note', async () => {
      const document = await decodeFixture(fixtures.creditNote);
      expect(getLinesArrayName(document)).toEqual('creditNoteLines');
    });

    it('prefers invoiceLines when both arrays exist', async () => {
      const document = await decodeBaseExample();
      const both = { ...document, creditNoteLines: [] } as unknown as PeppolDocument;
      expect(getLinesArrayName(both)).toEqual('invoiceLines');
    });

    it('returns creditNoteLines when the document carries neither array', () => {
      expect(getLinesArrayName({} as PeppolDocument)).toEqual('creditNoteLines');
    });
  });

  describe('sumFieldIssues', () => {
    it('returns an empty array when the aggregate equals the component sum', () => {
      expect(
        sumFieldIssues({
          aggregate: { path: 'total', actual: 100 },
          components: [
            { path: 'a', actual: 60 },
            { path: 'b', actual: 40 },
          ],
        })
      ).toEqual([]);
    });

    it('reports the aggregate then one issue per component when the sum differs', () => {
      expect(
        sumFieldIssues({
          aggregate: { path: 'total', actual: 100 },
          components: [
            { path: 'a', actual: 60 },
            { path: 'b', actual: 30 },
          ],
        })
      ).toEqual([
        { path: 'total', expected: 90, actual: 100 },
        { path: 'a', expected: null, actual: 60 },
        { path: 'b', expected: null, actual: 30 },
      ]);
    });

    it('honors a custom isEqual', () => {
      expect(
        sumFieldIssues({
          aggregate: { path: 'total', actual: 100 },
          components: [{ path: 'a', actual: 98 }],
          isEqual: (actual, expected) => Math.abs(actual - expected) < 5,
        })
      ).toEqual([]);
    });

    it('treats undefined contributions and actuals as zero and reports null', () => {
      expect(
        sumFieldIssues({
          aggregate: { path: 'total', actual: undefined },
          components: [
            { path: 'a', actual: undefined },
            { path: 'b', actual: 5, contribution: 10 },
          ],
        })
      ).toEqual([
        { path: 'total', expected: 10, actual: null },
        { path: 'a', expected: null, actual: null },
        { path: 'b', expected: null, actual: 5 },
      ]);
    });
  });

  describe('schematronRule', () => {
    const rule = { id: 'TEST-R001', level: 'fatal', message: 'test rule' } as const;

    it('passes when the predicate returns true', async () => {
      const document = await decodeBaseExample();
      const validator = schematronRule(rule, () => true);
      const result = await Effect.runPromise(Effect.result(validator(document)));
      expect(Result.isSuccess(result)).toEqual(true);
    });

    it('fails with empty fields when the predicate returns false', async () => {
      const document = await decodeBaseExample();
      const validator = schematronRule(rule, () => false);
      const result = await Effect.runPromise(Effect.result(validator(document)));
      expect(Result.isFailure(result)).toEqual(true);
      if (Result.isFailure(result)) {
        expect(result.failure).toBeInstanceOf(SchematronRuleError);
        expect(result.failure.fields).toEqual([]);
      }
    });

    it('passes when the predicate returns an empty array', async () => {
      const document = await decodeBaseExample();
      const validator = schematronRule(rule, () => []);
      const result = await Effect.runPromise(Effect.result(validator(document)));
      expect(Result.isSuccess(result)).toEqual(true);
    });

    it('fails with the returned field issues when the predicate returns a non-empty array', async () => {
      const document = await decodeBaseExample();
      const issues = [fieldIssue('a', 1, 2), fieldIssue('b', null, 'x')];
      const validator = schematronRule(rule, () => issues);
      const result = await Effect.runPromise(Effect.result(validator(document)));
      expect(Result.isFailure(result)).toEqual(true);
      if (Result.isFailure(result)) {
        expect(result.failure).toBeInstanceOf(SchematronRuleError);
        expect(result.failure.fields).toEqual(issues);
      }
    });
  });
});

// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolBillingBaseSchema } from './peppol-billing-base-schema';

const validBillingBase = {
  customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
  profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
  id: 'INV-001',
  issueDate: '2024-01-15',
  documentCurrencyCode: 'EUR',
  accountingSupplierParty: {
    endpointId: { id: '1234567890', schemeId: '0088' },
    postalAddress: { streetName: 'Main Street 1', cityName: 'London', postalZone: 'W1G 8LZ', countryCode: { identificationCode: 'GB' } },
    partyLegalEntity: { registrationName: 'Seller Company Ltd' },
  },
  accountingCustomerParty: {
    endpointId: { id: '9876543210', schemeId: '0088' },
    postalAddress: { cityName: 'Paris', countryCode: { identificationCode: 'FR' } },
    partyLegalEntity: { registrationName: 'Buyer Company SA' },
  },
  taxTotals: [
    {
      taxAmount: { currencyId: 'EUR', value: 20 },
      taxSubtotals: [
        {
          taxAmount: { currencyId: 'EUR', value: 20 },
          taxableAmount: { currencyId: 'EUR', value: 100 },
          taxCategory: { id: 'S', percent: 20, taxSchemeId: { id: 'VAT' } },
        },
      ],
    },
  ],
  legalMonetaryTotal: {
    lineExtensionAmount: { currencyId: 'EUR', value: 100 },
    taxExclusiveAmount: { currencyId: 'EUR', value: 100 },
    taxInclusiveAmount: { currencyId: 'EUR', value: 120 },
    payableAmount: { currencyId: 'EUR', value: 120 },
  },
} as const;

describe('peppolBillingBaseSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolBillingBaseSchema);
  const decode = testSchema.decoding({ parseOptions: { errors: 'all' } });

  it('should decode a valid billing base', async () => {
    await decode.succeed(validBillingBase);
  });

  it('should reject a billing base without required id', async () => {
    const { id: _id, ...noId } = validBillingBase;
    await decode.fail(noId, 'Missing key\n  at ["id"]');
  });

  it('should reject a billing base with an invalid issue date', async () => {
    await decode.fail(
      { ...validBillingBase, issueDate: 'not-a-date' },
      'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}$\n  at ["issueDate"]'
    );
  });

  it('should reject a billing base without tax totals', async () => {
    await decode.fail({ ...validBillingBase, taxTotals: [] }, 'Expected a value with a length of at least 1\n  at ["taxTotals"]');
  });

  it('should reject a specification identifier that violates PEPPOL-EN16931-R004', async () => {
    await decode.fail(
      { ...validBillingBase, customizationId: 'urn:not:valid' },
      'PEPPOL-EN16931-R004: Specification identifier MUST have the value \'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0\'.\n  at ["customizationId"]'
    );
  });

  it('should reject a business process identifier that violates PEPPOL-EN16931-R007', async () => {
    await decode.fail(
      { ...validBillingBase, profileId: 'urn:not:valid' },
      'PEPPOL-EN16931-R007: Business process MUST be in the format \'urn:fdc:peppol.eu:2017:poacc:billing:NN:1.0\' where NN indicates the process number.\n  at ["profileId"]'
    );
  });

  it('should apply default customizationId and profileId when omitted', async () => {
    const { customizationId: _cid, profileId: _pid, ...withoutDefaults } = validBillingBase;
    await decode.succeed(withoutDefaults, validBillingBase);
  });
});

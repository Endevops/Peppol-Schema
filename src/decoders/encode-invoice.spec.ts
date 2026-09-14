import { describe, expect, it } from '@effect/vitest';
import { Effect, Schema } from 'effect';

import { encodeInvoice } from '#/decoders/encode-invoice.ts';
import { PeppolInvoice } from '#/schemas/peppol-invoice-schema.ts';

describe('encodeInvoice()', () => {
  const decodePeppolInvoice = (input: any) => Effect.runSync(Schema.decodeEffect(PeppolInvoice)(input));
  const invoice = decodePeppolInvoice({
    accountingCost: '4025:123:4343',
    accountingCustomerParty: {
      contact: { electronicMail: 'lj@buyer.se', name: 'Lisa Johnson', telephone: '23434234' },
      endpointId: { id: 'FR23342', schemeId: '0002' },
      partyIdentification: { id: { id: 'FR23342', schemeId: '0002' } },
      partyLegalEntity: { companyId: { id: '39937423947', schemeId: '0183' }, registrationName: 'Buyer Official Name' },
      partyName: { name: 'BuyerTradingName AS' },
      partyTaxSchemes: [{ companyId: 'SE4598375937', taxSchemeId: { id: 'VAT' } }],
      postalAddress: {
        additionalStreetName: 'Po box 878',
        cityName: 'Stockholm',
        countryCode: { identificationCode: 'SE' },
        postalZone: '456 34',
        streetName: 'Hovedgatan 32',
      },
    },
    accountingSupplierParty: {
      endpointId: { id: '9482348239847239874', schemeId: '0088' },
      partyIdentification: { id: { id: '99887766' } },
      partyLegalEntity: { companyId: { id: 'GB983294' }, registrationName: 'SupplierOfficialName Ltd' },
      partyName: { name: 'SupplierTradingName Ltd.' },
      partyTaxSchemes: [{ companyId: 'GB1232434', taxSchemeId: { id: 'VAT' } }],
      postalAddress: {
        additionalStreetName: 'Postbox 123',
        cityName: 'London',
        countryCode: { identificationCode: 'GB' },
        postalZone: 'GB 123 EW',
        streetName: 'Main street 1',
      },
    },
    allowanceCharges: [
      {
        allowanceChargeReason: 'Insurance',
        amount: { currencyId: 'EUR', value: 25 },
        chargeIndicator: true,
        taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
      },
    ],
    buyerReference: '0150abc',
    customizationId: 'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0',
    delivery: {
      actualDeliveryDate: '2017-11-01',
      deliveryLocation: {
        address: {
          additionalStreetName: 'Building 56',
          cityName: 'Stockholm',
          countryCode: { identificationCode: 'SE' },
          postalZone: '21234',
          streetName: 'Delivery street 2',
        },
        id: { id: '9483759475923478', schemeId: '0088' },
      },
      deliveryParty: { partyName: { name: 'Delivery party Name' } },
    },
    documentCurrencyCode: 'EUR',
    dueDate: '2017-12-01',
    id: 'Snippet1',
    invoiceLines: [
      {
        accountingCost: 'Konteringsstreng',
        documentReference: [],
        id: '1',
        invoicedQuantity: { unitCode: 'DAY', value: 7 },
        item: {
          additionalItemProperties: [],
          classifiedTaxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
          commodityClassifications: [{ itemClassification: { id: '09348023', listId: 'SRV' } }],
          description: 'Description of item',
          name: 'item name',
          originCountryCode: { identificationCode: 'NO' },
          standardItemIdentification: { id: { id: '21382183120983', schemeId: '0088' } },
        },
        lineExtensionAmount: { currencyId: 'EUR', value: 2800 },
        orderLineReference: { lineId: '123' },
        price: { priceAmount: { currencyId: 'EUR', value: 400 } },
      },
      {
        documentReference: [],
        id: '2',
        invoicedQuantity: { unitCode: 'DAY', value: -3 },
        item: {
          additionalItemProperties: [],
          classifiedTaxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
          commodityClassifications: [{ itemClassification: { id: '09348023', listId: 'SRV' } }],
          description: 'Description 2',
          name: 'item name 2',
          originCountryCode: { identificationCode: 'NO' },
          standardItemIdentification: { id: { id: '21382183120983', schemeId: '0088' } },
        },
        lineExtensionAmount: { currencyId: 'EUR', value: -1500 },
        orderLineReference: { lineId: '123' },
        price: { priceAmount: { currencyId: 'EUR', value: 500 } },
      },
    ],
    invoiceTypeCode: '380',
    issueDate: '2017-11-13',
    legalMonetaryTotal: {
      chargeTotalAmount: { currencyId: 'EUR', value: 25 },
      lineExtensionAmount: { currencyId: 'EUR', value: 1300 },
      payableAmount: { currencyId: 'EUR', value: 1656.25 },
      taxExclusiveAmount: { currencyId: 'EUR', value: 1325 },
      taxInclusiveAmount: { currencyId: 'EUR', value: 1656.25 },
    },
    paymentMeans: [
      {
        payeeFinancialAccount: { financialInstitutionBranch: { id: 'BIC324098' }, id: 'IBAN32423940', name: 'AccountName' },
        paymentId: 'Snippet1',
        paymentMeansCode: { code: '30', name: 'Credit transfer' },
      },
    ],
    paymentTerms: { note: 'Payment within 10 days, 2% discount' },
    profileId: 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
    taxTotals: [
      {
        taxAmount: { currencyId: 'EUR', value: 331.25 },
        taxSubtotals: [
          {
            taxAmount: { currencyId: 'EUR', value: 331.25 },
            taxCategory: { id: 'S', percent: 25, taxSchemeId: { id: 'VAT' } },
            taxableAmount: { currencyId: 'EUR', value: 1325 },
          },
        ],
      },
    ],
  });

  it.effect(
    'should encode an invoice to the xml structure',
    Effect.fn(function* () {
      const result = yield* encodeInvoice(invoice).pipe(Effect.mapError(issue => new Schema.SchemaError(issue)));
      expect(result).toMatchSnapshot();
    })
  );
});

import { describe, expect, it } from 'vitest';

import { encodeLineShared } from './encode-line-shared';

describe('encodeLineShared', () => {
  it('encodes document references on the line', () => {
    const out = encodeLineShared({
      accountingCost: undefined,
      allowanceCharges: undefined,
      documentReference: [{ id: 'DR1', schemeId: 's', documentTypeCode: 'X' }],
      id: 'L1',
      invoicePeriod: undefined,
      item: {
        additionalItemProperties: undefined,
        buyersItemIdentification: undefined,
        classifiedTaxCategory: undefined,
        commodityClassifications: undefined,
        description: undefined,
        name: 'n',
        originCountryCode: undefined,
        sellersItemIdentification: undefined,
        standardItemIdentification: undefined,
      },
      lineExtensionAmount: undefined,
      orderLineReference: undefined,
      price: undefined,
    } as never);

    expect(out['cac:DocumentReference']).toHaveLength(1);
    expect(out['cac:DocumentReference']?.[0]).toMatchObject({ 'cbc:DocumentTypeCode': 'X', 'cbc:ID': expect.anything() });
  });

  it('returns undefined document references when absent', () => {
    const out = encodeLineShared({ id: 'L1', item: { name: 'n' } } as never);
    expect(out['cac:DocumentReference']).toBeUndefined();
  });
});

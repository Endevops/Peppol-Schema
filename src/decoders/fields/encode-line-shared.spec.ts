import { describe, expect, it } from 'vitest';

import { encodeLineShared } from './encode-line-shared';

describe('encodeLineShared', () => {
  it('encodes document references on the line', () => {
    const out = encodeLineShared({
      id: 'L1',
      lineExtensionAmount: undefined,
      accountingCost: undefined,
      invoicePeriod: undefined,
      orderLineReference: undefined,
      documentReference: [{ id: 'DR1', schemeId: 's', documentTypeCode: 'X' }],
      allowanceCharges: undefined,
      item: {
        description: undefined,
        name: 'n',
        buyersItemIdentification: undefined,
        sellersItemIdentification: undefined,
        standardItemIdentification: undefined,
        originCountryCode: undefined,
        commodityClassifications: undefined,
        classifiedTaxCategory: undefined,
        additionalItemProperties: undefined,
      },
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

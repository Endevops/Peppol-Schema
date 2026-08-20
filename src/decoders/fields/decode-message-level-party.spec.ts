import { describe, expect, it } from 'vitest';

import { decodeMessageLevelParty } from './decode-message-level-party';

describe('decodeMessageLevelParty', () => {
  it('returns undefined when the party path is missing', () => {
    const result = decodeMessageLevelParty({}, 'cac:AccountingSupplierParty');

    expect(result).toBeUndefined();
  });

  it('decodes a present party node with an endpoint id', () => {
    const result = decodeMessageLevelParty(
      { 'cac:AccountingSupplierParty': { 'cbc:EndpointID': { '#text': '111111111', '@schemeID': '0088' } } },
      'cac:AccountingSupplierParty'
    );

    expect(result).toEqual({ endpointId: { id: '111111111', schemeId: '0088' } });
  });

  it('decodes a present but empty party node to an undefined endpoint', () => {
    const result = decodeMessageLevelParty({ 'cac:AccountingSupplierParty': {} }, 'cac:AccountingSupplierParty');

    expect(result).toEqual({ endpointId: undefined });
  });
});

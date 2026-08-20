import { describe, expect, it } from 'vitest';

import { decodeOrderReference } from './decode-order-reference';

describe('decodeOrderReference', () => {
  it('returns undefined when the order reference path is missing', () => {
    const result = decodeOrderReference({}, 'cac:OrderReference');

    expect(result).toBeUndefined();
  });

  it('decodes a present order reference node', () => {
    const result = decodeOrderReference({ 'cac:OrderReference': { 'cbc:ID': 'ORD-1', 'cbc:SalesOrderID': 'SO-1' } }, 'cac:OrderReference');

    expect(result).toEqual({ id: 'ORD-1', salesOrderId: 'SO-1' });
  });

  it('decodes a present but empty order reference node to undefined ids', () => {
    const result = decodeOrderReference({ 'cac:OrderReference': {} }, 'cac:OrderReference');

    expect(result).toEqual({ id: undefined, salesOrderId: undefined });
  });
});

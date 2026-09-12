import { Effect } from 'effect';
import { describe, it, expect } from 'vitest';

import { encodeOrderReference } from './encode-order-reference';

describe('encodeOrderReference', () => {
  it('returns undefined when order reference is missing', () => {
    // ❌ Negative: undefined order reference → undefined.
    expect(Effect.runSync(encodeOrderReference(undefined))).toBeUndefined();
  });

  it('encodes a present order reference', () => {
    // ✅ Positive: id and sales order id are mapped to their XML keys.
    expect(Effect.runSync(encodeOrderReference({ id: 'ORD-1', salesOrderId: 'SO-1' }))).toEqual({ 'cbc:ID': 'ORD-1', 'cbc:SalesOrderID': 'SO-1' });
  });

  it('encodes an order reference without a sales order id', () => {
    // ✅ Positive: salesOrderId is optional and simply omitted.
    expect(Effect.runSync(encodeOrderReference({ id: 'ORD-2' }))).toEqual({ 'cbc:ID': 'ORD-2', 'cbc:SalesOrderID': undefined });
  });
});

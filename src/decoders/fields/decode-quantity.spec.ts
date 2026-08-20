import { describe, expect, it } from 'vitest';

import { decodeQuantity } from './decode-quantity';

describe('decodeQuantity', () => {
  it('decodes an object quantity node with unit code and text', () => {
    const result = decodeQuantity({ 'cbc:Quantity': { '#text': '10', '@unitCode': 'C62' } }, 'cbc:Quantity');

    expect(result).toEqual({ unitCode: 'C62', value: 10 });
  });

  it('decodes an object quantity node without a path', () => {
    const result = decodeQuantity({ '#text': '5', '@unitCode': 'KG' });

    expect(result).toEqual({ unitCode: 'KG', value: 5 });
  });

  it('decodes a plain string quantity without a unit code', () => {
    const result = decodeQuantity({ 'cbc:Quantity': '10' }, 'cbc:Quantity');

    expect(result).toEqual({ value: 10 });
  });

  it('proceeds for the numeric value zero and produces an undefined value', () => {
    const result = decodeQuantity({ 'cbc:Quantity': 0 }, 'cbc:Quantity');

    expect(result).toEqual({ value: undefined });
  });

  it('returns undefined when the quantity path is missing', () => {
    const result = decodeQuantity({}, 'cbc:Quantity');

    expect(result).toBeUndefined();
  });
});

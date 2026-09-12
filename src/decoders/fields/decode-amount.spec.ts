import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeAmount } from './decode-amount';

describe('decodeAmount', () => {
  it('decodes an object amount node with currency and text', () => {
    const result = Effect.runSync(decodeAmount({ 'cbc:Amount': { '#text': '100.00', '@currencyID': 'EUR' } }, 'cbc:Amount'));

    expect(result).toEqual({ currencyId: 'EUR', value: 100 });
  });

  it('decodes an object amount node without a path', () => {
    const result = Effect.runSync(decodeAmount({ '#text': '25.50', '@currencyID': 'USD' }));

    expect(result).toEqual({ currencyId: 'USD', value: 25.5 });
  });

  it('decodes a plain string amount without a currency', () => {
    const result = Effect.runSync(decodeAmount({ 'cbc:Amount': '100' }, 'cbc:Amount'));

    expect(result).toEqual({ currencyId: '', value: 100 });
  });

  it('decodes the numeric value zero', () => {
    const result = Effect.runSync(decodeAmount({ 'cbc:Amount': 0 }, 'cbc:Amount'));

    expect(result).toEqual({ currencyId: '', value: 0 });
  });

  it('decodes an object amount node without #text (falls back to the node)', () => {
    const result = Effect.runSync(decodeAmount({ 'cbc:Amount': { '@currencyID': 'HRK' } }, 'cbc:Amount'));

    expect(result).toEqual({ currencyId: 'HRK', value: NaN });
  });

  it('returns undefined when the amount path is missing', () => {
    const result = Effect.runSync(decodeAmount({}, 'cbc:Amount'));

    expect(result).toBeUndefined();
  });
});

import { describe, expect, it } from 'vitest';

import { invoiceStatusCodesKeys } from '#/values/invoice-status-codes.generated';

import { invoiceStatusCodeSchema } from './invoice-status-codes';

describe('invoice-status-codes-schema', () => {
  it.each(invoiceStatusCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(invoiceStatusCodeSchema().parse(value)).toEqual(expected);
  });
});

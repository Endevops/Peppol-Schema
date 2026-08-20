import { describe, expect, it } from 'vitest';

import { invoiceTypeCodesKeys } from '#/values/invoice-type-codes.generated';

import { invoiceTypeCodeSchema } from './invoice-type-code-schema';

describe('invoice-type-codes', () => {
  it.each(invoiceTypeCodesKeys.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(invoiceTypeCodeSchema().parse(value)).toEqual(expected);
  });
});

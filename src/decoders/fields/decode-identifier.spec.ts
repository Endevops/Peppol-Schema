import { describe, expect, it } from 'vitest';

import { decodeIdentifier } from './decode-identifier';

describe('decodeIdentifier', () => {
  it('decodes a plain string id', () => {
    const result = decodeIdentifier({ 'cbc:ID': 'abc' }, 'cbc:ID');

    expect(result).toEqual({ id: 'abc' });
  });

  it('decodes a numeric id without a scheme', () => {
    const result = decodeIdentifier({ 'cbc:ID': 5 }, 'cbc:ID');

    expect(result).toEqual({ id: '5' });
  });

  it('returns undefined for the numeric value zero', () => {
    const result = decodeIdentifier({ 'cbc:ID': 0 }, 'cbc:ID');

    expect(result).toBeUndefined();
  });

  it('returns undefined for an empty string id', () => {
    const result = decodeIdentifier({ 'cbc:ID': '' }, 'cbc:ID');

    expect(result).toBeUndefined();
  });

  it('decodes an object id with a scheme', () => {
    const result = decodeIdentifier({ 'cbc:ID': { '#text': 'x', '@schemeID': 'scheme' } }, 'cbc:ID');

    expect(result).toEqual({ id: 'x', schemeId: 'scheme' });
  });

  it('returns undefined when an object id has no text', () => {
    const result = decodeIdentifier({ 'cbc:ID': { '@schemeID': 'scheme' } }, 'cbc:ID');

    expect(result).toBeUndefined();
  });

  it('returns undefined when the id path is missing', () => {
    const result = decodeIdentifier({}, 'cbc:ID');

    expect(result).toBeUndefined();
  });
});

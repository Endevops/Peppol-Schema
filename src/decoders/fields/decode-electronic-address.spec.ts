import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeElectronicAddress } from './decode-electronic-address';

describe('decodeElectronicAddress', () => {
  it('pads the scheme id with leading zeros when it is present', () => {
    const result = Effect.runSync(
      decodeElectronicAddress({ 'cbc:EndpointID': { '#text': 'andrea@example.com', '@schemeID': 'EM' } }, 'cbc:EndpointID')
    );

    expect(result).toEqual({ id: 'andrea@example.com', schemeId: '00EM' });
  });

  it('keeps the decoded identifier untouched when it has no scheme id', () => {
    const result = Effect.runSync(decodeElectronicAddress({ 'cbc:EndpointID': { '#text': 'info@example.com' } }, 'cbc:EndpointID'));

    expect(result).toEqual({ id: 'info@example.com', schemeId: undefined });
  });

  it('decodes a plain string endpoint id without a scheme id', () => {
    const result = Effect.runSync(decodeElectronicAddress({ 'cbc:EndpointID': 'direct:foo' }, 'cbc:EndpointID'));

    expect(result).toEqual({ id: 'direct:foo' });
  });

  it('returns undefined when the endpoint path is missing', () => {
    const result = Effect.runSync(decodeElectronicAddress({}, 'cbc:EndpointID'));

    expect(result).toBeUndefined();
  });
});

import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { bool } from './bool';

describe('bool', () => {
  it('returns the value when it is a boolean', () => {
    expect(Effect.runSync(bool({ flag: true }, 'flag'))).toBe(true);
    expect(Effect.runSync(bool({ flag: false }, 'flag'))).toBe(false);
  });

  it('returns the text content when the value is an object with #text', () => {
    expect(Effect.runSync(bool({ flag: { '#text': 'true' } }, 'flag'))).toBe('true');
  });

  it('throws when #text is undefined', () => {
    expect(() => Effect.runSync(bool({ flag: { '#text': undefined } }, 'flag'))).toThrow('Unable to find flag into [object Object]');
  });

  it('throws when the value is an object without #text', () => {
    expect(() => Effect.runSync(bool({ flag: { other: 'x' } }, 'flag'))).toThrow('Unable to find flag into [object Object]');
  });

  it('throws when the value is a non-boolean primitive', () => {
    expect(() => Effect.runSync(bool({ flag: 'true' }, 'flag'))).toThrow('Unable to find flag into [object Object]');
  });

  it('throws when the value is missing', () => {
    expect(() => Effect.runSync(bool({}, 'flag'))).toThrow('Unable to find flag into [object Object]');
  });

  it('throws when the node is undefined', () => {
    expect(() => Effect.runSync(bool(undefined, 'flag'))).toThrow();
  });

  it('walks nested paths', () => {
    expect(Effect.runSync(bool({ 'cac:Party': { '@notifyingParty': false } }, 'cac:Party', '@notifyingParty'))).toBe(false);
  });
});

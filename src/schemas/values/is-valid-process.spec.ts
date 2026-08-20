import { describe, expect, it } from 'vitest';

import { isValidProcess } from './is-valid-process';

describe('isValidProcess', () => {
  it('returns true for a valid process id', () => {
    expect(isValidProcess('cenbii-procid-ubl::none')).toBe(true);
  });

  it('returns false for an unknown process id', () => {
    expect(isValidProcess('cenbii-procid-ubl::urn:not:a:process')).toBe(false);
  });
});

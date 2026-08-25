import { describe, expect, it } from 'vitest';

import { processesList } from '#/values/processes.generated';

import { isValidProcess } from './is-valid-process';

describe('isValidProcess', () => {
  it.each(processesList)('returns true for a valid process id (%s)', processId => {
    expect(isValidProcess(processId)).toBe(true);
  });

  it('returns false for an unknown process id', () => {
    expect(isValidProcess('cenbii-procid-ubl::urn:not:a:process')).toBe(false);
  });
});

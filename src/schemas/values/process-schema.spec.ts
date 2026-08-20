import { describe, expect, it } from 'vitest';

import { processesList } from '#/values/processes.generated';

import { processSchema } from './process-schema';

describe('process', () => {
  it.each(processesList.map(k => [k, k]) as [[string, string]])('should parse %s as %s', (value, expected) => {
    expect(processSchema().parse(value)).toEqual(expected);
  });
});

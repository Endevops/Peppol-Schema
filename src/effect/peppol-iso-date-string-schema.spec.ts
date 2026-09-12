import { DateTime } from 'effect';
// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolIsoDateStringSchema } from './peppol-iso-date-string-schema';

describe('peppolIsoDateStringSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolIsoDateStringSchema);
  const decode = testSchema.decoding();

  it('should decode a valid ISO date string', async () => {
    await decode.succeed('2024-01-15', DateTime.makeUnsafe('2024-01-15T00:00:00Z'));
  });

  it('should decode a valid ISO date string with timezone', async () => {
    await decode.succeed('2024-01-15Z', DateTime.makeUnsafe('2024-01-15T00:00:00Z'));
  });

  it('should reject a non-padded date', async () => {
    await decode.fail('2024-1-5', 'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}Z?$');
  });

  it('should reject a partial date', async () => {
    await decode.fail('2024-01', 'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}Z?$');
  });

  it('should reject a non-string date', async () => {
    await decode.fail(20240115, 'Expected string');
  });
});

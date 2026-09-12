// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolContactSchema } from './peppol-contact-schema';

describe('peppolContactSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolContactSchema);
  const decode = testSchema.decoding();

  it('should parse an empty contact', async () => {
    await decode.succeed({});
  });

  it('should parse a contact with all fields', async () => {
    await decode.succeed({ name: 'John Doe', telephone: '+44 20 1234 5678', electronicMail: 'john@example.com' });
  });

  it('should reject a non-string name', async () => {
    await decode.fail({ name: 42 }, 'Expected string | undefined\n  at ["name"]');
  });
});

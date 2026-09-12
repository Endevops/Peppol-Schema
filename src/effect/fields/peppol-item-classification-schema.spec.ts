// oxlint-disable vitest/expect-expect
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolItemClassificationSchema } from './peppol-item-classification-schema';

describe('peppolItemClassificationSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolItemClassificationSchema);
  const decode = testSchema.decoding();

  it('should parse an item classification', async () => {
    await decode.succeed({ id: '9873242', listId: 'AA' });
  });

  it('should parse an item classification with a list version id', async () => {
    await decode.succeed({ id: '9873242', listId: 'AA', listVersionId: '1' });
  });

  it('should reject an item classification without an id', async () => {
    await decode.fail({ listId: 'AA' }, 'Missing key\n  at ["id"]');
  });

  it('should reject an item classification without a list id', async () => {
    await decode.fail({ id: '9873242' }, 'Missing key\n  at ["listId"]');
  });
});

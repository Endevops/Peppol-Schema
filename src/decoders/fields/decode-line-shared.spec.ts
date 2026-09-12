import { Effect } from 'effect';
import { describe, expect, it } from 'vitest';

import { decodeLineShared } from './decode-line-shared';

describe('decodeLineShared', () => {
  it('decodes document references on the line', () => {
    const out = Effect.runSync(
      decodeLineShared({
        'cbc:ID': 'L1',
        'cac:Item': {},
        'cac:DocumentReference': [{ 'cbc:ID': { '#text': 'DR1', '@schemeID': 's' }, 'cbc:DocumentTypeCode': 'X' }],
      } as never)
    );

    expect(out.documentReference).toEqual([{ documentTypeCode: 'X', id: 'DR1', schemeId: 's' }]);
  });

  it('handles a line without a document reference (empty map)', () => {
    const out = Effect.runSync(decodeLineShared({ 'cbc:ID': 'L1', 'cac:Item': {} } as never));
    expect(out.documentReference).toEqual([]);
  });
});

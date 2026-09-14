import { describe, expect, it } from '@effect/vitest';
import { Effect, Schema } from 'effect';

import { decodeCreditNoteLines } from './decode-credit-note-lines.ts';

describe('decodeCreditNoteLines', () => {
  it('returns an empty array when the credit note line path is missing', () => {
    const result = Effect.runSync(decodeCreditNoteLines({}, 'cac:CreditNoteLine'));

    expect(result).toEqual([]);
  });

  it.effect(
    'decodes a present, non-empty array of credit note lines',
    Effect.fn(function* () {
      const result = yield* decodeCreditNoteLines(
        { 'cac:CreditNoteLine': [{ 'cbc:CreditedQuantity': '2', 'cbc:ID': '1' }] },
        'cac:CreditNoteLine'
      ).pipe(Effect.mapError(issue => new Schema.SchemaError(issue)));

      expect(result).toEqual([expect.objectContaining({ creditedQuantity: { value: 2 }, id: '1' })]);
    })
  );

  it.effect(
    'wraps a single (non-array) credit note line node into an array',
    Effect.fn(function* () {
      const result = Effect.runSync(decodeCreditNoteLines({ 'cac:CreditNoteLine': { 'cbc:CreditedQuantity': '3' } }, 'cac:CreditNoteLine'));

      expect(result).toEqual([expect.objectContaining({ creditedQuantity: { value: 3 } })]);
    })
  );
});

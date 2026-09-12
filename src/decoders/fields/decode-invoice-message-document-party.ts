import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { InvoiceDocumentResponseParty } from '#/schemas/invoice-response-schema';
import type { RecursivePartial } from '#/types';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodeInvoiceMessageDocumentParty = Effect.fn(function* (
  party: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<InvoiceDocumentResponseParty> | undefined> {
  const val = yield* getProp(party, ...path);
  if (Predicate.isNullish(val)) return undefined;
  const partyName = yield* getProp(val, 'cac:PartyName');
  return {
    partyIdentification: yield* decodeIdentifier(val, 'cac:PartyIdentification', 'cbc:ID'),
    partyName: Predicate.isNotNullish(partyName) ? { name: yield* strOrUnd(partyName, 'cbc:Name') } : undefined,
  };
});

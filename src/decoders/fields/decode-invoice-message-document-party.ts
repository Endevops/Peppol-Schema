import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolInvoiceDocumentResponseParty } from '#/schemas/peppol-invoice-response-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodeInvoiceMessageDocumentParty = Effect.fn(function* (
  party: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolInvoiceDocumentResponseParty> | undefined> {
  const val = yield* getProp(party, ...path);
  if (Predicate.isNullish(val)) return undefined;
  const partyName = yield* getProp(val, 'cac:PartyName');
  return {
    partyIdentification: yield* decodeIdentifier(val, 'cac:PartyIdentification', 'cbc:ID'),
    partyName: Predicate.isNotNullish(partyName) ? { name: yield* strOrUnd(partyName, 'cbc:Name') } : undefined,
  };
});

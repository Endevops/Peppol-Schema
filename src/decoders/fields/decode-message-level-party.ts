import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolMessageLevelResponseParty } from '#/schemas/peppol-message-level-response-party-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address.ts';
import { getProp } from '#/helpers/get-prop.ts';

export const decodeMessageLevelParty = Effect.fn(function* (
  party: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolMessageLevelResponseParty> | undefined> {
  const val = yield* getProp(party, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return { endpointId: yield* decodeElectronicAddress(val, 'cbc:EndpointID') };
});

import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolMessageLevelResponseParty } from '#/schemas/message-level-response-party-schema';
import type { RecursivePartial } from '#/types';

import { decodeElectronicAddress } from '#/decoders/fields/decode-electronic-address';
import { getProp } from '#/helpers/get-prop';

export const decodeMessageLevelParty = Effect.fn(function* (
  party: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolMessageLevelResponseParty> | undefined> {
  const val = yield* getProp(party, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return { endpointId: yield* decodeElectronicAddress(val, 'cbc:EndpointID') };
});

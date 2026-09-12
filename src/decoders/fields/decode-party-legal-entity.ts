import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyLegalEntitySchema } from '#/schemas/fields/party-legal-entity-schema';
import type { RecursivePartial } from '#/types';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export const decodePartyLegalEntity = Effect.fn(function* (
  node: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPartyLegalEntitySchema> | undefined> {
  const partyLegalEntityNode = yield* getProp(node, ...path);
  if (Predicate.isNullish(partyLegalEntityNode)) return undefined;

  return {
    companyId: yield* decodeIdentifier(partyLegalEntityNode, 'cbc:CompanyID'),
    companyLegalForm: yield* strOrUnd(partyLegalEntityNode, 'cbc:CompanyLegalForm'),
    registrationName: yield* strOrUnd(partyLegalEntityNode, 'cbc:RegistrationName'),
  };
});

import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolPartyLegalEntitySchema } from '#/schemas/fields/peppol-party-legal-entity-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeIdentifier } from '#/decoders/fields/decode-identifier.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

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

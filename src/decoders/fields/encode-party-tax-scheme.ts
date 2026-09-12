import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolPartyTaxSchema } from '#/schemas/fields/party-tax-schema';

import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';

export const encodePartyTaxScheme = Effect.fn(function* (partyTaxScheme: PeppolPartyTaxSchema | undefined): Effect.fn.Return<XmlNode> {
  if (Predicate.isNullish(partyTaxScheme)) return undefined;

  return { 'cbc:CompanyID': partyTaxScheme.companyId, 'cac:TaxScheme': yield* encodeSimpleIdentifier(partyTaxScheme.taxSchemeId) };
});

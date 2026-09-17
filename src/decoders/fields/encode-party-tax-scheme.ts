import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolPartyTaxScheme } from '#/schemas/fields/peppol-party-tax-scheme-schema.ts';

import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier.ts';

export const encodePartyTaxScheme = Effect.fn(function* (partyTaxScheme: PeppolPartyTaxScheme | undefined): Effect.fn.Return<XmlNode> {
  if (Predicate.isNullish(partyTaxScheme)) return undefined;

  return { 'cbc:CompanyID': partyTaxScheme.companyId, 'cac:TaxScheme': yield* encodeSimpleIdentifier(partyTaxScheme.taxSchemeId) };
});

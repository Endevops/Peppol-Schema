import { Effect } from 'effect';

import { encodeIdentifier } from '#/decoders/fields/encode-identifier.ts';

export const encodePartyLegalEntity = Effect.fn(function* (legalEntity: {
  registrationName?: string | undefined;
  companyId?: Parameters<typeof encodeIdentifier>[0];
  companyLegalForm?: string | undefined;
}) {
  return {
    'cbc:RegistrationName': legalEntity.registrationName,
    'cbc:CompanyID': yield* encodeIdentifier(legalEntity.companyId),
    'cbc:CompanyLegalForm': legalEntity.companyLegalForm,
  };
});

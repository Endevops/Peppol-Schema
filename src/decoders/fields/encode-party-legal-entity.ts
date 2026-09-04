import { encodeIdentifier } from '#/decoders/fields/encode-identifier';

export function encodePartyLegalEntity(legalEntity: {
  registrationName?: string;
  companyId?: Parameters<typeof encodeIdentifier>[0];
  companyLegalForm?: string;
}) {
  return {
    'cbc:RegistrationName': legalEntity.registrationName,
    'cbc:CompanyID': encodeIdentifier(legalEntity.companyId),
    'cbc:CompanyLegalForm': legalEntity.companyLegalForm,
  };
}

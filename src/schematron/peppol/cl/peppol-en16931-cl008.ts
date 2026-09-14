import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';
import { electronicAddressCodesKeys } from '#/values/eas-codes.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL008',
  level: 'fatal',
  message: 'Electronic address identifier scheme must be from the codelist "Electronic Address Identifier Scheme"',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931CL008(document: PeppolDocument): boolean {
  const schemeIds: Array<string | undefined> = [
    document.accountingSupplierParty.endpointId?.schemeId,
    document.accountingCustomerParty.endpointId?.schemeId,
  ];
  const passed = schemeIds.every(schemeId => schemeId === undefined || (electronicAddressCodesKeys as ReadonlyArray<string>).includes(schemeId));
  return passed;
}

export const validatePeppolEn16931CL008 = schematronRule(rule, evaluatePeppolEn16931CL008);

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';
import { electronicAddressCodesKeys } from '#/values/eas-codes.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL008',
  level: 'fatal',
  message: 'Electronic address identifier scheme must be from the codelist "Electronic Address Identifier Scheme"',
} as const satisfies SchematronRule;

export function validatePeppolEn16931CL008(document: PeppolDocument): SchematronRuleResult {
  const schemeIds: Array<string | undefined> = [
    document.accountingSupplierParty.endpointId?.schemeId,
    document.accountingCustomerParty.endpointId?.schemeId,
  ];
  const passed = schemeIds.every(schemeId => schemeId === undefined || (electronicAddressCodesKeys as ReadonlyArray<string>).includes(schemeId));
  return schematronResult(rule, passed);
}

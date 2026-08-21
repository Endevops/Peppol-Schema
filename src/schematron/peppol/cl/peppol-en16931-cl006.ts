import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';
import { vatDateCodesKeys } from '#/values/vat-dates.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL006',
  level: 'fatal',
  message: 'Invoice period description code must be according to UNCL 2005 D.16B.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931CL006(document: PeppolDocument): SchematronRuleResult {
  const descriptionCode = document.invoicePeriod?.descriptionCode;
  if (descriptionCode === undefined) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, (vatDateCodesKeys as ReadonlyArray<string>).includes(descriptionCode));
}

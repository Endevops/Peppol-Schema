import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';
import { vatDateCodesKeys } from '#/values/vat-dates.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL006',
  level: 'fatal',
  message: 'Invoice period description code must be according to UNCL 2005 D.16B.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931CL006(document: PeppolDocument): boolean {
  const descriptionCode = document.invoicePeriod?.descriptionCode;
  if (descriptionCode === undefined) {
    return true;
  }
  return (vatDateCodesKeys as ReadonlyArray<string>).includes(descriptionCode);
}

export const validatePeppolEn16931CL006 = schematronRule(rule, evaluatePeppolEn16931CL006);

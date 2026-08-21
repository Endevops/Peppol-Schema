import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R111',
  level: 'fatal',
  message: 'End date of line period MUST be within invoice period.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R111(document: PeppolDocument): SchematronRuleResult {
  const invoicePeriodEnd = document.invoicePeriod?.endDate;
  if (!invoicePeriodEnd) {
    return schematronResult(rule, true);
  }
  const passed = getLines(document).every(line => {
    const lineEnd = line.invoicePeriod?.endDate;
    return !lineEnd || lineEnd <= invoicePeriodEnd;
  });
  return schematronResult(rule, passed);
}

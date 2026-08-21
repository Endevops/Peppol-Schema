import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R110',
  level: 'fatal',
  message: 'Start date of line period MUST be within invoice period.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R110(document: PeppolDocument): SchematronRuleResult {
  const invoicePeriodStart = document.invoicePeriod?.startDate;
  if (!invoicePeriodStart) {
    return schematronResult(rule, true);
  }
  const passed = getLines(document).every(line => {
    const lineStart = line.invoicePeriod?.startDate;
    return !lineStart || lineStart >= invoicePeriodStart;
  });
  return schematronResult(rule, passed);
}

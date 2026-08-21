import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = { id: 'PEPPOL-EN16931-F001', level: 'fatal', message: 'A date MUST be formatted YYYY-MM-DD.' } as const satisfies SchematronRule;

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (value: string | undefined): boolean => value === undefined || (DATE_REGEX.test(value) && !Number.isNaN(Date.parse(value)));

export function validatePeppolEn16931F001(document: PeppolDocument): SchematronRuleResult {
  const dates: Array<string | undefined> = [document.issueDate];
  if (document.dueDate) dates.push(document.dueDate);
  if (document.taxPointDate) dates.push(document.taxPointDate);
  if (document.invoicePeriod?.startDate) dates.push(document.invoicePeriod.startDate);
  if (document.invoicePeriod?.endDate) dates.push(document.invoicePeriod.endDate);
  if (document.delivery?.actualDeliveryDate) dates.push(document.delivery.actualDeliveryDate);
  for (const line of getLines(document)) {
    if (line.invoicePeriod?.startDate) dates.push(line.invoicePeriod.startDate);
    if (line.invoicePeriod?.endDate) dates.push(line.invoicePeriod.endDate);
  }
  return schematronResult(rule, dates.every(isValidDate));
}

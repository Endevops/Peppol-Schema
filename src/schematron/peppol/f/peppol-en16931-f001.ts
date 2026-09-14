import { Predicate, Schema } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string';
import { getLines, schematronRule } from '#/schematron/helpers';

const rule = { id: 'PEPPOL-EN16931-F001', level: 'fatal', message: 'A date MUST be formatted YYYY-MM-DD.' } as const satisfies SchematronRule;

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (value: string | undefined): boolean => value === undefined || (DATE_REGEX.test(value) && !Number.isNaN(Date.parse(value)));

const encodeDateSync = Schema.encodeSync(Schema.Union([PeppolIsoDateString, Schema.String]));
const isDate = Schema.is(PeppolIsoDateString);

function evaluatePeppolEn16931F001(document: PeppolDocument): boolean {
  const dates: Array<string | undefined> = [encodeDateSync(document.issueDate)];
  if (Predicate.hasProperty(document, 'dueDate') && isDate(document.dueDate)) dates.push(encodeDateSync(document.dueDate));
  if (document.taxPointDate) dates.push(encodeDateSync(document.taxPointDate));
  if (document.invoicePeriod?.startDate) dates.push(encodeDateSync(document.invoicePeriod.startDate));
  if (document.invoicePeriod?.endDate) dates.push(encodeDateSync(document.invoicePeriod.endDate));
  if (document.delivery?.actualDeliveryDate) dates.push(encodeDateSync(document.delivery.actualDeliveryDate));
  for (const line of getLines(document)) {
    if (line.invoicePeriod?.startDate) dates.push(encodeDateSync(line.invoicePeriod.startDate));
    if (line.invoicePeriod?.endDate) dates.push(encodeDateSync(line.invoicePeriod.endDate));
  }
  return dates.every(isValidDate);
}

export const validatePeppolEn16931F001 = schematronRule(rule, evaluatePeppolEn16931F001);

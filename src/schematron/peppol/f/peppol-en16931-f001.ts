import { DateTime, Predicate, Schema } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { PeppolIsoDateString } from '#/schemas/peppol-iso-date-string.ts';
import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = { id: 'PEPPOL-EN16931-F001', level: 'fatal', message: 'A date MUST be formatted YYYY-MM-DD.' } as const satisfies SchematronRule;

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (value: string | undefined): boolean => value === undefined || (DATE_REGEX.test(value) && !Number.isNaN(Date.parse(value)));

const formatDate = (value: PeppolIsoDateString | string): string => {
  if (typeof value === 'string') {
    return value;
  }
  return DateTime.formatIsoDate(value);
};
const isDate = Schema.is(PeppolIsoDateString);

const collectDates = (document: PeppolDocument): Array<string> => {
  const optionalDates = [
    document.taxPointDate,
    document.invoicePeriod?.startDate,
    document.invoicePeriod?.endDate,
    document.delivery?.actualDeliveryDate,
    ...getLines(document).flatMap(line => [line.invoicePeriod?.startDate, line.invoicePeriod?.endDate]),
  ].filter((date): date is string => date !== undefined);

  const dates = [document.issueDate, ...optionalDates].map(date => formatDate(date));
  if (Predicate.hasProperty(document, 'dueDate') && isDate(document.dueDate)) {
    dates.push(formatDate(document.dueDate));
  }
  return dates;
};

function evaluatePeppolEn16931F001(document: PeppolDocument): boolean {
  return collectDates(document).every(isValidDate);
}

export const validatePeppolEn16931F001 = schematronRule(rule, evaluatePeppolEn16931F001);

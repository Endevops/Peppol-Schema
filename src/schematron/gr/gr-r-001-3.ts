import { DateTime } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'GR-R-001-3',
  level: 'fatal',
  message: 'When the Supplier is Greek, the Invoice Id second segment must be a valid Date that matches the invoice Issue Date',
} as const satisfies SchematronRule;

const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])[-/]?(0?[1-9]|1[0-2])[-/]?((?:19|20)[0-9]{2})$/;
const formatIssueDate = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }
  if (DateTime.isDateTime(value)) {
    return DateTime.formatIsoDate(value);
  }
  return String(value);
};

function evaluateGrR001_3(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return true;
  }
  const segments = document.id.split('|');
  const secondSegment = segments[1];
  if (!secondSegment || secondSegment.trim().length === 0) {
    return false;
  }
  const dateMatch = secondSegment.match(DATE_REGEX);
  if (!dateMatch) {
    return false;
  }
  const [, day, month, year] = dateMatch;
  const issueDate = formatIssueDate(document.issueDate);
  const issueDateSegments = issueDate.split('-');
  return day === issueDateSegments[2] && month === issueDateSegments[1] && year === issueDateSegments[0];
}

export const validateGrR001_3 = schematronRule(rule, evaluateGrR001_3);

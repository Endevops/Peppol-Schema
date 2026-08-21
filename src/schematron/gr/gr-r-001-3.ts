import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-001-3',
  level: 'fatal',
  message: 'When the Supplier is Greek, the Invoice Id second segment must be a valid Date that matches the invoice Issue Date',
} as const satisfies SchematronRule;

const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])[-/]?(0?[1-9]|1[0-2])[-/]?((?:19|20)[0-9]{2})$/;

export function validateGrR001_3(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const segments = document.id.split('|');
  const secondSegment = segments[1];
  if (!secondSegment || secondSegment.trim().length === 0) {
    return schematronResult(rule, false);
  }
  const dateMatch = secondSegment.match(DATE_REGEX);
  if (!dateMatch) {
    return schematronResult(rule, false);
  }
  const [, day, month, year] = dateMatch;
  const issueDate = document.issueDate;
  const issueDateSegments = issueDate.split('-');
  return schematronResult(rule, day === issueDateSegments[2] && month === issueDateSegments[1] && year === issueDateSegments[0]);
}

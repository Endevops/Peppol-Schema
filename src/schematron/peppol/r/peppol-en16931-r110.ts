import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R110',
  level: 'fatal',
  message: 'Start date of line period MUST be within invoice period.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R110(document: PeppolDocument): boolean {
  const invoicePeriodStart = document.invoicePeriod?.startDate;
  if (!invoicePeriodStart) {
    return true;
  }
  const passed = getLines(document).every(line => {
    const lineStart = line.invoicePeriod?.startDate;
    return !lineStart || lineStart >= invoicePeriodStart;
  });
  return passed;
}

export const validatePeppolEn16931R110 = schematronRule(rule, evaluatePeppolEn16931R110);

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R111',
  level: 'fatal',
  message: 'End date of line period MUST be within invoice period.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R111(document: PeppolDocument): boolean {
  const invoicePeriodEnd = document.invoicePeriod?.endDate;
  if (!invoicePeriodEnd) {
    return true;
  }
  const passed = getLines(document).every(line => {
    const lineEnd = line.invoicePeriod?.endDate;
    return !lineEnd || lineEnd <= invoicePeriodEnd;
  });
  return passed;
}

export const validatePeppolEn16931R111 = schematronRule(rule, evaluatePeppolEn16931R111);

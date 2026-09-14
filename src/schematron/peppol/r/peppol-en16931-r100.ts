import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = { id: 'PEPPOL-EN16931-R100', level: 'fatal', message: 'Only one invoiced object is allowed pr line' } as const satisfies SchematronRule;

function evaluatePeppolEn16931R100(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => (line.documentReference?.length ?? 0) <= 1);
  return passed;
}

export const validatePeppolEn16931R100 = schematronRule(rule, evaluatePeppolEn16931R100);

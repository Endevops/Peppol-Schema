import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R101',
  level: 'fatal',
  message: 'Element Document reference can only be used for Invoice line object',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R101(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => {
    const references = line.documentReference ?? [];
    return references.every(ref => ref.documentTypeCode === '130');
  });
  return passed;
}

export const validatePeppolEn16931R101 = schematronRule(rule, evaluatePeppolEn16931R101);

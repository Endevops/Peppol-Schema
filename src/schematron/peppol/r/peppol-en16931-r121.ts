import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R121',
  level: 'fatal',
  message: 'Base quantity MUST be a positive number above zero.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R121(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => {
    const baseQuantity = line.price.baseQuantity?.value;
    return baseQuantity === undefined || baseQuantity > 0;
  });
  return passed;
}

export const validatePeppolEn16931R121 = schematronRule(rule, evaluatePeppolEn16931R121);

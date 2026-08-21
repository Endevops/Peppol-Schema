import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R121',
  level: 'fatal',
  message: 'Base quantity MUST be a positive number above zero.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R121(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => {
    const baseQuantity = line.price.baseQuantity?.value;
    return baseQuantity === undefined || baseQuantity > 0;
  });
  return schematronResult(rule, passed);
}

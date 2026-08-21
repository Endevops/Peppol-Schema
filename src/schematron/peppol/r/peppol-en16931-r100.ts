import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = { id: 'PEPPOL-EN16931-R100', level: 'fatal', message: 'Only one invoiced object is allowed pr line' } as const satisfies SchematronRule;

export function validatePeppolEn16931R100(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => (line.documentReference?.length ?? 0) <= 1);
  return schematronResult(rule, passed);
}

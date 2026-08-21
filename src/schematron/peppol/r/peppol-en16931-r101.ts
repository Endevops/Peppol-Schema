import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R101',
  level: 'fatal',
  message: 'Element Document reference can only be used for Invoice line object',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R101(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => {
    const references = line.documentReference ?? [];
    return references.every(ref => ref.documentTypeCode === '130');
  });
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R002',
  level: 'fatal',
  message: 'No more than one note is allowed on document level, unless both the buyer and seller are German organizations.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R002(document: PeppolDocument): SchematronRuleResult {
  const noteCount = typeof document.note === 'string' ? 1 : 0;
  return schematronResult(rule, noteCount <= 1);
}

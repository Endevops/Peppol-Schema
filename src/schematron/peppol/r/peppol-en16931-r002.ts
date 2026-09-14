import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R002',
  level: 'fatal',
  message: 'No more than one note is allowed on document level, unless both the buyer and seller are German organizations.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R002(document: PeppolDocument): boolean {
  const noteCount = typeof document.note === 'string' ? 1 : 0;
  return noteCount <= 1;
}

export const validatePeppolEn16931R002 = schematronRule(rule, evaluatePeppolEn16931R002);

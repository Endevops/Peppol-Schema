import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-52',
  level: 'fatal',
  message: 'Each Additional supporting document (BG-24) shall contain a Supporting document reference (BT-122).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br52(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.additionalDocumentReferences ?? []).every(ref => typeof ref.id?.id === 'string' && ref.id.id.trim() !== '');
  return schematronResult(rule, passed);
}

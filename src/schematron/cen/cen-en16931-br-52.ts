import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-52',
  level: 'fatal',
  message: 'Each Additional supporting document (BG-24) shall contain a Supporting document reference (BT-122).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br52(document: PeppolDocument): boolean {
  const passed = (document.additionalDocumentReferences ?? []).every(ref => typeof ref.id?.id === 'string' && ref.id.id.trim() !== '');
  return passed;
}

export const validateCenEn16931Br52 = schematronRule(rule, evaluateCenEn16931Br52);

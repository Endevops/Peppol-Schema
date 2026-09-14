import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-64',
  level: 'fatal',
  message: 'The Item standard identifier (BT-157) shall have a Scheme identifier.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br64(document: PeppolDocument): boolean {
  const passed = getLines(document).every(
    line => !line.item.standardItemIdentification || typeof line.item.standardItemIdentification.id.schemeId === 'string'
  );
  return passed;
}

export const validateCenEn16931Br64 = schematronRule(rule, evaluateCenEn16931Br64);

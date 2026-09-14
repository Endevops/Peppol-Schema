import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-26',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall contain the Item net price (BT-146).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br26(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => typeof line.price.priceAmount === 'object' && line.price.priceAmount !== null);
  return passed;
}

export const validateCenEn16931Br26 = schematronRule(rule, evaluateCenEn16931Br26);

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-43',
  level: 'fatal',
  message: 'Each Invoice line charge (BG-28) shall have an Invoice line charge amount (BT-141).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br43(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? []).filter(ac => ac.chargeIndicator).every(ac => typeof ac.amount === 'object' && ac.amount !== null)
  );
  return passed;
}

export const validateCenEn16931Br43 = schematronRule(rule, evaluateCenEn16931Br43);

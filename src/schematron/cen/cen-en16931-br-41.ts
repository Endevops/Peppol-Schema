import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-41',
  level: 'fatal',
  message: 'Each Invoice line allowance (BG-27) shall have an Invoice line allowance amount (BT-136).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br41(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? []).filter(ac => !ac.chargeIndicator).every(ac => typeof ac.amount === 'object' && ac.amount !== null)
  );
  return passed;
}

export const validateCenEn16931Br41 = schematronRule(rule, evaluateCenEn16931Br41);

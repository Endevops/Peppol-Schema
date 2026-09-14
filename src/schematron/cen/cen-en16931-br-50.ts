import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-50',
  level: 'fatal',
  message: 'A Payment account identifier (BT-84) shall be present if Credit transfer (BG-17) information is provided in the Invoice.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br50(document: PeppolDocument): boolean {
  const passed = (document.paymentMeans ?? []).every(
    pm =>
      (pm.paymentMeansCode?.code !== '30' && pm.paymentMeansCode?.code !== '58') ||
      (typeof pm.payeeFinancialAccount?.id === 'string' && pm.payeeFinancialAccount.id.trim() !== '')
  );
  return passed;
}

export const validateCenEn16931Br50 = schematronRule(rule, evaluateCenEn16931Br50);

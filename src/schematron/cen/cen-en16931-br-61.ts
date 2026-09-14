import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-61',
  level: 'fatal',
  message:
    'If the Payment means type code (BT-81) means SEPA credit transfer, Local credit transfer or Non-SEPA international credit transfer, the Payment account identifier (BT-84) shall be present.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br61(document: PeppolDocument): boolean {
  const passed = (document.paymentMeans ?? []).every(
    pm =>
      (pm.paymentMeansCode?.code !== '30' && pm.paymentMeansCode?.code !== '58') ||
      (typeof pm.payeeFinancialAccount?.id === 'string' && pm.payeeFinancialAccount.id.trim() !== '')
  );
  return passed;
}

export const validateCenEn16931Br61 = schematronRule(rule, evaluateCenEn16931Br61);

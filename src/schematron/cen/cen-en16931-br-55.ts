import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-55',
  level: 'fatal',
  message: 'Each Preceding Invoice reference (BG-3) shall contain a Preceding Invoice reference (BT-25).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br55(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.billingReferences ?? []).every(
    ref => typeof ref.invoiceDocumentReference.id === 'string' && ref.invoiceDocumentReference.id.trim() !== ''
  );
  return schematronResult(rule, passed);
}

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-55',
  level: 'fatal',
  message: 'Each Preceding Invoice reference (BG-3) shall contain a Preceding Invoice reference (BT-25).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br55(document: PeppolDocument): boolean {
  const passed = (document.billingReferences ?? []).every(
    ref => typeof ref.invoiceDocumentReference.id === 'string' && ref.invoiceDocumentReference.id.trim() !== ''
  );
  return passed;
}

export const validateCenEn16931Br55 = schematronRule(rule, evaluateCenEn16931Br55);

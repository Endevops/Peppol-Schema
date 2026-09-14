import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-04',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall be categorized with an Invoiced item VAT category code (BT-151).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo04(document: PeppolDocument): boolean {
  const passed = getLines(document).every(
    line => typeof line.item.classifiedTaxCategory?.id === 'string' && line.item.classifiedTaxCategory.taxSchemeId.id.toUpperCase() === 'VAT'
  );
  return passed;
}

export const validateCenEn16931BrCo04 = schematronRule(rule, evaluateCenEn16931BrCo04);

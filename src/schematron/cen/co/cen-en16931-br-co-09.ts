import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { allVatCompanyIdsHaveValidPrefix, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-09',
  level: 'fatal',
  message:
    'The Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) shall have a prefix in accordance with ISO code ISO 3166-1 alpha-2 by which the country of issue may be identified. Nevertheless, Greece may use the prefix ‘EL’.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo09(document: PeppolDocument): boolean {
  const passed = allVatCompanyIdsHaveValidPrefix(document);
  return passed;
}

export const validateCenEn16931BrCo09 = schematronRule(rule, evaluateCenEn16931BrCo09);

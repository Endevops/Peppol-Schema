import type { SchematronRule } from '#/schematron/helpers.ts';

import { categoryTaxableSumFieldIssues, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-G-08',
  level: 'fatal',
  message:
    'In a VAT breakdown (BG-23) where the VAT category code (BT-118) is "Export outside the EU" the VAT category taxable amount (BT-116) shall equal the sum of Invoice line net amounts (BT-131) minus the sum of Document level allowance amounts (BT-92) plus the sum of Document level charge amounts (BT-99) where the VAT category codes (BT-151, BT-95, BT-102) are "Export outside the EU".',
} as const satisfies SchematronRule;

export const validateCenEn16931BrG08 = schematronRule(rule, document => categoryTaxableSumFieldIssues(document, 'G'));

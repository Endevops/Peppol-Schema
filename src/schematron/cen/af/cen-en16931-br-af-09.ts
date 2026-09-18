import type { SchematronRule } from '#/schematron/helpers.ts';

import { categoryTaxAmountFieldIssues, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-AF-09',
  level: 'fatal',
  message:
    'The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where VAT category code (BT-118) is "IGIC" shall equal the VAT category taxable amount (BT-116) multiplied by the VAT category rate (BT-119).',
} as const satisfies SchematronRule;

export const validateCenEn16931BrAf09 = schematronRule(rule, document => categoryTaxAmountFieldIssues(document, 'L'));

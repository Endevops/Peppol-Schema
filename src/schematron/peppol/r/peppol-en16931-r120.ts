import type { SchematronRule } from '#/schematron/helpers.ts';

import { lineNetAmountFieldIssues, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R120',
  level: 'fatal',
  message:
    'Invoice line net amount MUST equal (Invoiced quantity * (Item net price/item price base quantity) + Sum of invoice line charge amount - sum of invoice line allowance amount',
} as const satisfies SchematronRule;

export const validatePeppolEn16931R120 = schematronRule(rule, lineNetAmountFieldIssues);

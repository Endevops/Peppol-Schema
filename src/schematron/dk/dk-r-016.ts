import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-016',
  level: 'fatal',
  message: 'For Danish Suppliers, a Credit note cannot have a negative total (PayableAmount)',
} as const satisfies SchematronRule;

export function validateDkR016(document: PeppolDocument): SchematronRuleResult {
  if (!('creditNoteLines' in document) || getSupplierCountry(document) !== 'DK' || getCustomerCountry(document) !== 'DK') {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, document.legalMonetaryTotal.payableAmount.value >= 0);
}

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { isDanishSupplierAndCustomer, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-016',
  level: 'fatal',
  message: 'For Danish Suppliers, a Credit note cannot have a negative total (PayableAmount)',
} as const satisfies SchematronRule;

function evaluateDkR016(document: PeppolDocument): boolean {
  if (!('creditNoteLines' in document) || !isDanishSupplierAndCustomer(document)) {
    return true;
  }
  return document.legalMonetaryTotal.payableAmount.value >= 0;
}

export const validateDkR016 = schematronRule(rule, evaluateDkR016);

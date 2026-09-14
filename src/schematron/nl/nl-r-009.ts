import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, getSupplierCountry, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'NL-R-009',
  level: 'fatal',
  message:
    '[NL-R-009] For suppliers in the Netherlands, if an order line reference (cac:OrderLineReference/cbc:LineID) is used, there must be an order reference on the document level (cac:OrderReference/cbc:ID)',
} as const satisfies SchematronRule;

function evaluateNlR009(document: PeppolDocument): boolean {
  if (getSupplierCountry(document) !== 'NL') {
    return true;
  }
  const hasOrderLineReference = getLines(document).some(line => Boolean(line.orderLineReference?.lineId));
  if (!hasOrderLineReference) {
    return true;
  }
  return Boolean(document.orderReference?.id);
}

export const validateNlR009 = schematronRule(rule, evaluateNlR009);

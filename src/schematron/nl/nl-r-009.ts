import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'NL-R-009',
  level: 'fatal',
  message:
    '[NL-R-009] For suppliers in the Netherlands, if an order line reference (cac:OrderLineReference/cbc:LineID) is used, there must be an order reference on the document level (cac:OrderReference/cbc:ID)',
} as const satisfies SchematronRule;

export function validateNlR009(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'NL') {
    return schematronResult(rule, true);
  }
  const hasOrderLineReference = getLines(document).some(line => Boolean(line.orderLineReference?.lineId));
  if (!hasOrderLineReference) {
    return schematronResult(rule, true);
  }
  return schematronResult(rule, Boolean(document.orderReference?.id));
}

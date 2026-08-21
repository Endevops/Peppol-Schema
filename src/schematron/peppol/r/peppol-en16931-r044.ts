import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R044',
  level: 'fatal',
  message: "Charge on price level is NOT allowed. Only value 'false' allowed.",
} as const satisfies SchematronRule;

export function validatePeppolEn16931R044(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => !line.price.allowanceCharge || !line.price.allowanceCharge.chargeIndicator);
  return schematronResult(rule, passed);
}

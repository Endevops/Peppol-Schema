import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R044',
  level: 'fatal',
  message: "Charge on price level is NOT allowed. Only value 'false' allowed.",
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R044(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => !line.price.allowanceCharge || !line.price.allowanceCharge.chargeIndicator);
  return passed;
}

export const validatePeppolEn16931R044 = schematronRule(rule, evaluatePeppolEn16931R044);

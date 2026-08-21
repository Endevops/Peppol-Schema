import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { isCustomerGermany, isSupplierGermany, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DE-R-018',
  level: 'fatal',
  message:
    'Information on cash discounts for prompt payment (Skonto) shall be provided within the element "Payment terms" BT-20 in the following way: First segment "SKONTO", second segment amount of days ("TAGE=N"), third segment percentage ("PROZENT=N"). Percentage must be separated by dot with two decimal places. In case the base value of the invoiced amount is not provided in BT-115 but as a partial amount, the base value shall be provided as fourth segment "BASISBETRAG=N" as semantic data type amount. Each entry shall start with a #, the segments must be separated by # and a row shall end with a #. A complete statement on cash discount for prompt payment shall end with a XML-conformant line break.',
} as const satisfies SchematronRule;

const SKONTO_REGEX = /^#(SKONTO)#TAGE=([0-9]+#PROZENT=[0-9]+\.[0-9]{2})(#BASISBETRAG=-?[0-9]+\.[0-9]{2})?#$/;

export function validateDeR018(document: PeppolDocument): SchematronRuleResult {
  if (!isSupplierGermany(document) || !isCustomerGermany(document)) {
    return schematronResult(rule, true);
  }
  const note = document.paymentTerms?.note;
  if (note === undefined) {
    return schematronResult(rule, true);
  }
  const lines = note.split(/\r?\n/).filter(line => line.startsWith('#'));
  if (lines.length === 0) {
    return schematronResult(rule, true);
  }
  const passed = lines.every(line => SKONTO_REGEX.test(line.trim()));
  return schematronResult(rule, passed);
}

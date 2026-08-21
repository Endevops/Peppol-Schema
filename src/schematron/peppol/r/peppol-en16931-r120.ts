import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLineQuantity, getLines, schematronResult, slack } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R120',
  level: 'fatal',
  message:
    'Invoice line net amount MUST equal (Invoiced quantity * (Item net price/item price base quantity) + Sum of invoice line charge amount - sum of invoice line allowance amount',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R120(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => {
    const lineExtensionAmount = line.lineExtensionAmount.value;
    const quantity = getLineQuantity(line);
    const priceAmount = line.price.priceAmount.value;
    const baseQuantity = line.price.baseQuantity?.value ?? 1;
    const allowancesTotal = (line.allowanceCharges ?? []).filter(ac => !ac.chargeIndicator).reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0);
    const chargesTotal = (line.allowanceCharges ?? []).filter(ac => ac.chargeIndicator).reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0);
    const expected = quantity * (priceAmount / baseQuantity) + chargesTotal - allowancesTotal;
    return slack(expected, lineExtensionAmount, 0.02);
  });
  return schematronResult(rule, passed);
}

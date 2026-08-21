import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';
import { currencyCodesKeys } from '#/values/currency-code.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL007',
  level: 'fatal',
  message: 'Currency code must be according to ISO 4217:2005',
} as const satisfies SchematronRule;

const isValidCurrency = (code: string): boolean => (currencyCodesKeys as ReadonlyArray<string>).includes(code);

export function validatePeppolEn16931CL007(document: PeppolDocument): SchematronRuleResult {
  const currencies: Array<string> = [document.documentCurrencyCode];
  if (document.taxCurrencyCode) {
    currencies.push(document.taxCurrencyCode);
  }
  for (const line of getLines(document)) {
    currencies.push(line.lineExtensionAmount.currencyId);
    currencies.push(line.price.priceAmount.currencyId);
  }
  const total = document.legalMonetaryTotal;
  currencies.push(
    total.lineExtensionAmount.currencyId,
    total.taxExclusiveAmount.currencyId,
    total.taxInclusiveAmount.currencyId,
    total.payableAmount.currencyId
  );
  if (total.allowanceTotalAmount) currencies.push(total.allowanceTotalAmount.currencyId);
  if (total.chargeTotalAmount) currencies.push(total.chargeTotalAmount.currencyId);
  if (total.prepaidAmount) currencies.push(total.prepaidAmount.currencyId);
  if (total.payableRoundingAmount) currencies.push(total.payableRoundingAmount.currencyId);
  for (const taxTotal of document.taxTotals) {
    currencies.push(taxTotal.taxAmount.currencyId);
    for (const subtotal of taxTotal.taxSubtotals ?? []) {
      currencies.push(subtotal.taxAmount.currencyId, subtotal.taxableAmount.currencyId);
    }
  }
  return schematronResult(rule, currencies.every(isValidCurrency));
}

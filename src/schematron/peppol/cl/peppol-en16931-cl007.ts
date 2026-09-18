import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';
import { currencyCodesKeys } from '#/values/currency-code.generated';

const rule = {
  id: 'PEPPOL-EN16931-CL007',
  level: 'fatal',
  message: 'Currency code must be according to ISO 4217:2005',
} as const satisfies SchematronRule;

const isValidCurrency = (code: string): boolean => (currencyCodesKeys as ReadonlyArray<string>).includes(code);

const collectCurrencies = (document: PeppolDocument): Array<string> => {
  const total = document.legalMonetaryTotal;
  const optionalTotalCurrencies = [
    total.allowanceTotalAmount?.currencyId,
    total.chargeTotalAmount?.currencyId,
    total.prepaidAmount?.currencyId,
    total.payableRoundingAmount?.currencyId,
  ].filter((code): code is NonNullable<typeof code> => code !== undefined);

  return [
    document.documentCurrencyCode,
    ...(document.taxCurrencyCode ? [document.taxCurrencyCode] : []),
    ...getLines(document).flatMap(line => [line.lineExtensionAmount.currencyId, line.price.priceAmount.currencyId]),
    total.lineExtensionAmount.currencyId,
    total.taxExclusiveAmount.currencyId,
    total.taxInclusiveAmount.currencyId,
    total.payableAmount.currencyId,
    ...optionalTotalCurrencies,
    ...document.taxTotals.flatMap(taxTotal => [
      taxTotal.taxAmount.currencyId,
      ...(taxTotal.taxSubtotals ?? []).flatMap(subtotal => [subtotal.taxAmount.currencyId, subtotal.taxableAmount.currencyId]),
    ]),
  ];
};

function evaluatePeppolEn16931CL007(document: PeppolDocument): boolean {
  return collectCurrencies(document).every(isValidCurrency);
}

export const validatePeppolEn16931CL007 = schematronRule(rule, evaluatePeppolEn16931CL007);

import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R051',
  level: 'fatal',
  message:
    'All currencyID attributes must have the same value as the invoice currency code (BT-5), except for the invoice total VAT amount in accounting currency (BT-111).',
} as const satisfies SchematronRule;

interface CurrencyAmount {
  currencyId: string;
}

interface AllowanceChargeAmounts {
  amount?: CurrencyAmount | undefined;
  baseAmount?: CurrencyAmount | undefined;
}

const matchesCurrency = (amount: CurrencyAmount | undefined, expected: string): boolean => amount?.currencyId === expected;

const optionalMatchesCurrency = (amount: CurrencyAmount | undefined, expected: string): boolean =>
  amount === undefined || matchesCurrency(amount, expected);

const allowanceChargeMatchesCurrency = (allowanceCharge: AllowanceChargeAmounts, expected: string): boolean =>
  matchesCurrency(allowanceCharge.amount, expected) && optionalMatchesCurrency(allowanceCharge.baseAmount, expected);

function evaluatePeppolEn16931R051(document: PeppolDocument): boolean {
  const currency = document.documentCurrencyCode;

  const documentAllowancesOk = (document.allowanceCharges ?? []).every(allowanceCharge => allowanceChargeMatchesCurrency(allowanceCharge, currency));

  const linesOk = getLines(document).every(
    line =>
      matchesCurrency(line.price.priceAmount, currency) &&
      matchesCurrency(line.lineExtensionAmount, currency) &&
      (line.allowanceCharges ?? []).every(allowanceCharge => allowanceChargeMatchesCurrency(allowanceCharge, currency))
  );

  const taxTotalsOk = document.taxTotals.every(total => {
    // Only tax totals with subtotals are in scope for BT-110; the accounting currency total (BT-111) is excluded.
    if ((total.taxSubtotals?.length ?? 0) === 0) {
      return true;
    }
    return (
      matchesCurrency(total.taxAmount, currency) &&
      (total.taxSubtotals ?? []).every(subtotal => matchesCurrency(subtotal.taxAmount, currency) && matchesCurrency(subtotal.taxableAmount, currency))
    );
  });

  const totals = document.legalMonetaryTotal;
  const requiredTotals: Array<CurrencyAmount> = [
    totals.lineExtensionAmount,
    totals.taxExclusiveAmount,
    totals.taxInclusiveAmount,
    totals.payableAmount,
  ];
  const optionalTotals: Array<CurrencyAmount | undefined> = [
    totals.allowanceTotalAmount,
    totals.chargeTotalAmount,
    totals.prepaidAmount,
    totals.payableRoundingAmount,
  ];

  const totalsOk =
    requiredTotals.every(amount => matchesCurrency(amount, currency)) && optionalTotals.every(amount => optionalMatchesCurrency(amount, currency));

  return documentAllowancesOk && linesOk && taxTotalsOk && totalsOk;
}

export const validatePeppolEn16931R051 = schematronRule(rule, evaluatePeppolEn16931R051);

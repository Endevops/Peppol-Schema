import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R051',
  level: 'fatal',
  message:
    'All currencyID attributes must have the same value as the invoice currency code (BT-5), except for the invoice total VAT amount in accounting currency (BT-111).',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R051(document: PeppolDocument): boolean {
  const documentCurrency = document.documentCurrencyCode;
  const checkCurrency = (currencyId: string | undefined): boolean => currencyId === documentCurrency;

  const documentAllowancesOk = (document.allowanceCharges ?? []).every(
    ac => checkCurrency(ac.amount?.currencyId) && (!ac.baseAmount || checkCurrency(ac.baseAmount.currencyId))
  );

  const linesOk = getLines(document).every(line => {
    const lineAllowancesOk = (line.allowanceCharges ?? []).every(
      ac => checkCurrency(ac.amount?.currencyId) && (!ac.baseAmount || checkCurrency(ac.baseAmount.currencyId))
    );
    return checkCurrency(line.price.priceAmount.currencyId) && checkCurrency(line.lineExtensionAmount.currencyId) && lineAllowancesOk;
  });

  const taxTotalsOk = document.taxTotals.every(total => {
    // Only tax totals with subtotals are in scope for BT-110; the accounting currency total (BT-111) is excluded.
    if ((total.taxSubtotals?.length ?? 0) === 0) {
      return true;
    }
    return (
      checkCurrency(total.taxAmount.currencyId) &&
      (total.taxSubtotals ?? []).every(st => checkCurrency(st.taxAmount.currencyId) && checkCurrency(st.taxableAmount.currencyId))
    );
  });

  const totals = document.legalMonetaryTotal;
  const totalsOk =
    checkCurrency(totals.lineExtensionAmount.currencyId) &&
    checkCurrency(totals.taxExclusiveAmount.currencyId) &&
    checkCurrency(totals.taxInclusiveAmount.currencyId) &&
    (!totals.allowanceTotalAmount || checkCurrency(totals.allowanceTotalAmount.currencyId)) &&
    (!totals.chargeTotalAmount || checkCurrency(totals.chargeTotalAmount.currencyId)) &&
    (!totals.prepaidAmount || checkCurrency(totals.prepaidAmount.currencyId)) &&
    (!totals.payableRoundingAmount || checkCurrency(totals.payableRoundingAmount.currencyId)) &&
    checkCurrency(totals.payableAmount.currencyId);

  return documentAllowancesOk && linesOk && taxTotalsOk && totalsOk;
}

export const validatePeppolEn16931R051 = schematronRule(rule, evaluatePeppolEn16931R051);

import type { PeppolPaymentMeans } from '#/schemas/fields/payment-means-schema';

import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';

export function encodePaymentMeans(pms: Array<PeppolPaymentMeans> | undefined) {
  return pms?.map(pm => ({
    'cbc:PaymentMeansCode': encodePaymentMeansCode(pm.paymentMeansCode),
    'cbc:PaymentID': pm.paymentId,
    'cbc:PaymentDueDate': pm.paymentDueDate,
    'cac:CardAccount': pm.cardAccount
      ? {
          'cbc:PrimaryAccountNumberID': pm.cardAccount.primaryAccountNumberId,
          'cbc:NetworkID': pm.cardAccount.networkId,
          'cbc:HolderName': pm.cardAccount.holderName,
        }
      : undefined,
    'cac:PayeeFinancialAccount': encodePayeeFinancialAccount(pm.payeeFinancialAccount),
    'cac:PaymentMandate': encodePaymentMendate(pm.paymentMandate),
  }));
}

function encodePaymentMeansCode(code: PeppolPaymentMeans['paymentMeansCode'] | undefined) {
  if (!code) return undefined;
  return { '#text': code.code, '@name': code.name };
}

function encodePaymentMendate(mendate: PeppolPaymentMeans['paymentMandate'] | undefined) {
  if (!mendate) return undefined;
  return { 'cbc:Id': mendate.id, 'cac:PayerFinancialAccount': encodeSimpleIdentifier(mendate.payerFinancialAccountId) };
}

function encodePayeeFinancialAccount(account: PeppolPaymentMeans['payeeFinancialAccount'] | undefined) {
  if (!account) return undefined;
  return {
    'cbc:ID': account.id,
    'cbc:Name': account.name,
    'cac:FinancialInstitutionBranch': encodeSimpleIdentifier(account.financialInstitutionBranch),
  };
}

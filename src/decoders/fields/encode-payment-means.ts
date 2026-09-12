import { Effect, Predicate } from 'effect';

import type { PeppolPaymentMeans } from '#/schemas/fields/payment-means-schema';

import { encodeSimpleIdentifier } from '#/decoders/fields/encode-simple-identifier';

export const encodePaymentMeans = Effect.fn(function* (pms: Array<PeppolPaymentMeans> | undefined) {
  if (Predicate.isNullish(pms)) return undefined;

  return yield* Effect.forEach(
    pms,
    Effect.fn(function* (pm: PeppolPaymentMeans) {
      return {
        'cbc:PaymentMeansCode': yield* encodePaymentMeansCode(pm.paymentMeansCode),
        'cbc:PaymentID': pm.paymentId,
        'cbc:PaymentDueDate': pm.paymentDueDate,
        'cac:CardAccount': Predicate.isNotNullish(pm.cardAccount)
          ? {
              'cbc:PrimaryAccountNumberID': pm.cardAccount.primaryAccountNumberId,
              'cbc:NetworkID': pm.cardAccount.networkId,
              'cbc:HolderName': pm.cardAccount.holderName,
            }
          : undefined,
        'cac:PayeeFinancialAccount': yield* encodePayeeFinancialAccount(pm.payeeFinancialAccount),
        'cac:PaymentMandate': yield* encodePaymentMendate(pm.paymentMandate),
      };
    })
  );
});

const encodePaymentMeansCode = Effect.fn(function* (code: PeppolPaymentMeans['paymentMeansCode'] | undefined) {
  if (Predicate.isNullish(code)) return undefined;
  return { '#text': code.code, '@name': code.name };
});

const encodePaymentMendate = Effect.fn(function* (mendate: PeppolPaymentMeans['paymentMandate'] | undefined) {
  if (Predicate.isNullish(mendate)) return undefined;
  return { 'cbc:Id': mendate.id, 'cac:PayerFinancialAccount': yield* encodeSimpleIdentifier(mendate.payerFinancialAccountId) };
});

const encodePayeeFinancialAccount = Effect.fn(function* (account: PeppolPaymentMeans['payeeFinancialAccount'] | undefined) {
  if (Predicate.isNullish(account)) return undefined;
  return {
    'cbc:ID': account.id,
    'cbc:Name': account.name,
    'cac:FinancialInstitutionBranch': yield* encodeSimpleIdentifier(account.financialInstitutionBranch),
  };
});

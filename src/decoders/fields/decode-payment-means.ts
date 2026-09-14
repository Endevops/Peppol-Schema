import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';
import type { PeppolIdentifier } from '#/schemas/fields/peppol-identifier-schema.ts';
import type { PeppolPaymentMeans } from '#/schemas/fields/peppol-payment-means-schema.ts';
import type { RecursivePartial } from '#/types.ts';

import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier.ts';
import { getArray } from '#/helpers/get-array.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

export const decodePaymentMeans = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<PeppolPaymentMeans>> | undefined> {
  const arr = yield* getArray(doc, ...path);
  if (arr.length === 0) return undefined;

  return yield* Effect.forEach(
    arr,
    Effect.fn(function* (paymentMeans: XmlNode) {
      const cardAccount = yield* getProp(paymentMeans, 'cac:CardAccount');

      return {
        cardAccount: Predicate.isNotNullish(cardAccount)
          ? {
              holderName: yield* strOrUnd(cardAccount, 'cbc:HolderName'),
              networkId: yield* strOrUnd(cardAccount, 'cbc:NetworkID'),
              primaryAccountNumberId: yield* strOrUnd(cardAccount, 'cbc:PrimaryAccountNumberID'),
            }
          : undefined,
        payeeFinancialAccount: yield* decodePayeeFinancialAccount(paymentMeans, 'cac:PayeeFinancialAccount'),
        paymentDueDate: yield* strOrUnd(paymentMeans, 'cbc:PaymentDueDate'),
        paymentId: yield* strOrUnd(paymentMeans, 'cbc:PaymentID'),
        paymentMandate: yield* decodePaymentMendates(paymentMeans, 'cac:PaymentMandate'),
        paymentMeansCode: yield* decodePaymentMeansCodes(paymentMeans, 'cbc:PaymentMeansCode'),
      };
    })
  );
});

const decodePayeeFinancialAccount = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPaymentMeans['payeeFinancialAccount']> | undefined> {
  const node = yield* getProp(doc, ...path);
  if (Predicate.isNullish(node)) return undefined;

  let financialInstitutionBranch: RecursivePartial<PeppolIdentifier> | undefined = yield* decodeSimpleIdentifer(
    node,
    'cac:FinancialInstitutionBranch'
  );
  // NOTE: this 2 way comparision is necessary to ensure that `id` is null with a returned value which means that it is not direct child
  if (Predicate.isNotUndefined(financialInstitutionBranch) && !Predicate.isTruthy(financialInstitutionBranch?.id)) {
    financialInstitutionBranch = yield* decodeSimpleIdentifer(node, 'cac:FinancialInstitutionBranch', 'ns0:FinancialInstitution');
  }
  return { financialInstitutionBranch, id: yield* strOrUnd(node, 'cbc:ID'), name: yield* strOrUnd(node, 'cbc:Name') };
});

const decodePaymentMendates = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPaymentMeans['paymentMandate']> | undefined> {
  const node = yield* getProp(doc, ...path);
  if (Predicate.isNullish(node)) return undefined;

  return { id: yield* strOrUnd(node, 'cbc:ID'), payerFinancialAccountId: yield* decodeSimpleIdentifer(node, 'cac:PayerFinancialAccount') };
});

const decodePaymentMeansCodes = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolPaymentMeans['paymentMeansCode']> | undefined> {
  const node = yield* getProp(doc, ...path);
  if (Predicate.isNullish(node)) return undefined;
  return { code: yield* strOrUnd(node), name: yield* strOrUnd(node, '@name') };
});

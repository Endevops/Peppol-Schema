import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolIdentifier } from '#/schemas/fields/identifier-schema';
import type { PeppolPaymentMeans } from '#/schemas/fields/payment-means-schema';
import type { RecursivePartial } from '#/types';

import { decodeSimpleIdentifer } from '#/decoders/fields/decode-simple-identifier';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

export function decodePaymentMeans(doc: XmlNode, ...path: Array<string>): Array<RecursivePartial<PeppolPaymentMeans>> | undefined {
  const arr = getArray(doc, ...path);
  if (!arr.length) return undefined;

  return arr.map(paymentMeans => {
    const cardAccount = getProp(paymentMeans, 'cac:CardAccount');

    return {
      cardAccount: cardAccount
        ? {
            holderName: strOrUnd(cardAccount, 'cbc:HolderName'),
            networkId: strOrUnd(cardAccount, 'cbc:NetworkID'),
            primaryAccountNumberId: strOrUnd(cardAccount, 'cbc:PrimaryAccountNumberID'),
          }
        : undefined,
      payeeFinancialAccount: decodePayeeFinancialAccount(paymentMeans, 'cac:PayeeFinancialAccount'),
      paymentDueDate: strOrUnd(paymentMeans, 'cbc:PaymentDueDate'),
      paymentId: strOrUnd(paymentMeans, 'cbc:PaymentID'),
      paymentMandate: decodePaymentMendates(paymentMeans, 'cac:PaymentMandate'),
      paymentMeansCode: decodePaymentMeansCodes(paymentMeans, 'cbc:PaymentMeansCode'),
    };
  });
}

function decodePayeeFinancialAccount(
  doc: XmlNode,
  ...path: Array<string>
): RecursivePartial<PeppolPaymentMeans['payeeFinancialAccount']> | undefined {
  const node = getProp(doc, ...path);
  if (!node) return undefined;

  let financialInstitutionBranch: RecursivePartial<PeppolIdentifier> | undefined;
  financialInstitutionBranch = decodeSimpleIdentifer(node, 'cac:FinancialInstitutionBranch');
  // NOTE: this 2 way comparision is necessary to ensure that `id` is null with a returned value which means that it is not direct child
  if (financialInstitutionBranch !== undefined && !financialInstitutionBranch?.id) {
    financialInstitutionBranch = decodeSimpleIdentifer(node, 'cac:FinancialInstitutionBranch', 'ns0:FinancialInstitution');
  }
  return { financialInstitutionBranch, id: strOrUnd(node, 'cbc:ID'), name: strOrUnd(node, 'cbc:Name') };
}

function decodePaymentMendates(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPaymentMeans['paymentMandate']> | undefined {
  const node = getProp(doc, ...path);
  if (!node) return undefined;

  return { id: strOrUnd(node, 'cbc:ID'), payerFinancialAccountId: decodeSimpleIdentifer(node, 'cac:PayerFinancialAccount') };
}

function decodePaymentMeansCodes(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolPaymentMeans['paymentMeansCode']> | undefined {
  const node = getProp(doc, ...path);
  if (!node) return undefined;
  return { code: strOrUnd(node), name: strOrUnd(node, '@name') };
}

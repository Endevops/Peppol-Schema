import type { XmlNode } from '#/helpers';
import type { PeppolIdentifier } from '#/schemas/fields/identifier-schema';
import type { PeppolPaymentMeans } from '#/schemas/fields/payment-means-schema';
import type { RecursivePartial } from '#/types';

import { decodeSimpleIdentifer, encodeSimpleIdentifier } from '#/decoders/fields/id';
import { getArray, getProp, strOrUnd } from '#/helpers';

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

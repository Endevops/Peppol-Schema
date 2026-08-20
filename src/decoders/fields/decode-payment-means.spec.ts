import { describe, expect, it } from 'vitest';

import { decodePaymentMeans } from './decode-payment-means';

const fullMeansDoc = {
  'cac:PaymentMeans': [
    {
      'cac:CardAccount': { 'cbc:HolderName': 'John Doe', 'cbc:NetworkID': 'VISA', 'cbc:PrimaryAccountNumberID': '4111111111111111' },
      'cac:PayeeFinancialAccount': {
        'cac:FinancialInstitutionBranch': { 'cbc:Name': 'Nordea', 'ns0:FinancialInstitution': { 'cbc:ID': 'NBANNO22' } },
        'cbc:ID': 'FI-ACC-1',
        'cbc:Name': 'Main Account',
      },
      'cac:PaymentMandate': { 'cac:PayerFinancialAccount': { 'cbc:ID': 'PAYER-ACC' }, 'cbc:ID': 'MAND-1' },
      'cbc:PaymentDueDate': '2024-01-01',
      'cbc:PaymentID': 'PAY-1',
      'cbc:PaymentMeansCode': { '#text': '58', '@name': 'SEPA Credit Transfer' },
    },
  ],
};

describe('decodePaymentMeans', () => {
  it('returns undefined when the payment means path is missing', () => {
    const result = decodePaymentMeans({}, 'cac:PaymentMeans');

    expect(result).toBeUndefined();
  });

  it('decodes a payment means with every optional sub-part present', () => {
    const [result] = decodePaymentMeans(fullMeansDoc, 'cac:PaymentMeans') ?? [];

    expect(result).toEqual({
      cardAccount: { holderName: 'John Doe', networkId: 'VISA', primaryAccountNumberId: '4111111111111111' },
      payeeFinancialAccount: { financialInstitutionBranch: { id: 'NBANNO22' }, id: 'FI-ACC-1', name: 'Main Account' },
      paymentDueDate: '2024-01-01',
      paymentId: 'PAY-1',
      paymentMandate: { id: 'MAND-1', payerFinancialAccountId: { id: 'PAYER-ACC' } },
      paymentMeansCode: { code: '58', name: 'SEPA Credit Transfer' },
    });
  });

  it('decodes an empty payment means to all-undefined fields', () => {
    const [result] = decodePaymentMeans({ 'cac:PaymentMeans': [{}] }, 'cac:PaymentMeans') ?? [];

    expect(result).toEqual({
      cardAccount: undefined,
      payeeFinancialAccount: undefined,
      paymentDueDate: undefined,
      paymentId: undefined,
      paymentMandate: undefined,
      paymentMeansCode: undefined,
    });
  });

  it('keeps a financial institution branch with an id as-is', () => {
    const [result] =
      decodePaymentMeans(
        { 'cac:PaymentMeans': [{ 'cac:PayeeFinancialAccount': { 'cac:FinancialInstitutionBranch': { 'cbc:ID': 'BR-1' } } }] },
        'cac:PaymentMeans'
      ) ?? [];

    expect(result?.payeeFinancialAccount).toEqual({ financialInstitutionBranch: { id: 'BR-1' }, id: undefined, name: undefined });
  });

  it('decodes a plain text payment means code', () => {
    const [result] = decodePaymentMeans({ 'cac:PaymentMeans': [{ 'cbc:PaymentMeansCode': '58' }] }, 'cac:PaymentMeans') ?? [];

    expect(result?.paymentMeansCode).toEqual({ code: '58', name: undefined });
  });

  it('decodes a payee financial account without a financial institution branch', () => {
    const [result] = decodePaymentMeans({ 'cac:PaymentMeans': [{ 'cac:PayeeFinancialAccount': { 'cbc:ID': 'FI-2' } }] }, 'cac:PaymentMeans') ?? [];

    expect(result?.payeeFinancialAccount).toEqual({ financialInstitutionBranch: undefined, id: 'FI-2', name: undefined });
  });
});

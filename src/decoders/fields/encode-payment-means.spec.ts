import { describe, it, expect } from 'vitest';

import { encodePaymentMeans } from './encode-payment-means';

const allFields = {
  cardAccount: { holderName: 'Jane Doe', networkId: 'VISA', primaryAccountNumberId: '1234' },
  payeeFinancialAccount: { financialInstitutionBranch: { id: '9998' }, id: 'IBAN-1', name: 'Main' },
  paymentDueDate: '2026-01-01',
  paymentId: 'PAY-1',
  paymentMandate: { id: 'M-1', payerFinancialAccountId: { id: 'DE-1' } },
  paymentMeansCode: { code: '30', name: 'Credit transfer' },
};

describe('encodePaymentMeans', () => {
  it('returns undefined when the means array is undefined', () => {
    // ❌ Negative: undefined array → undefined.
    expect(encodePaymentMeans(undefined)).toBeUndefined();
  });

  it('encodes a payment means with every field present', () => {
    // ✅ Positive: card account, code, mandate and financial account are all encoded.
    const result = encodePaymentMeans([allFields]);
    expect(result?.[0]).toEqual({
      'cac:CardAccount': { 'cbc:HolderName': 'Jane Doe', 'cbc:NetworkID': 'VISA', 'cbc:PrimaryAccountNumberID': '1234' },
      'cac:PayeeFinancialAccount': { 'cac:FinancialInstitutionBranch': { 'cbc:ID': '9998' }, 'cbc:ID': 'IBAN-1', 'cbc:Name': 'Main' },
      'cac:PaymentMandate': { 'cac:PayerFinancialAccount': { 'cbc:ID': 'DE-1' }, 'cbc:Id': 'M-1' },
      'cbc:PaymentDueDate': '2026-01-01',
      'cbc:PaymentID': 'PAY-1',
      'cbc:PaymentMeansCode': { '#text': '30', '@name': 'Credit transfer' },
    });
  });

  it('omits every optional sub-block when only paymentId is present', () => {
    // ❌ Negative: cardAccount, paymentMeansCode, mandate and financial account all absent.
    const result = encodePaymentMeans([{ paymentId: 'PAY-2' }] as any);
    expect(result?.[0]).toEqual({
      'cac:CardAccount': undefined,
      'cac:PayeeFinancialAccount': undefined,
      'cac:PaymentMandate': undefined,
      'cbc:PaymentDueDate': undefined,
      'cbc:PaymentID': 'PAY-2',
      'cbc:PaymentMeansCode': undefined,
    });
  });
});

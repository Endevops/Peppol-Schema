import { describe, it, expect } from 'vitest';

import { encodePaymentMeans } from './encode-payment-means';

const allFields = {
  paymentMeansCode: { code: '30', name: 'Credit transfer' },
  paymentId: 'PAY-1',
  paymentDueDate: '2026-01-01',
  cardAccount: { primaryAccountNumberId: '1234', networkId: 'VISA', holderName: 'Jane Doe' },
  payeeFinancialAccount: { id: 'IBAN-1', name: 'Main', financialInstitutionBranch: { id: '9998' } },
  paymentMandate: { id: 'M-1', payerFinancialAccountId: { id: 'DE-1' } },
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
      'cbc:PaymentMeansCode': { '#text': '30', '@name': 'Credit transfer' },
      'cbc:PaymentID': 'PAY-1',
      'cbc:PaymentDueDate': '2026-01-01',
      'cac:CardAccount': { 'cbc:PrimaryAccountNumberID': '1234', 'cbc:NetworkID': 'VISA', 'cbc:HolderName': 'Jane Doe' },
      'cac:PayeeFinancialAccount': { 'cbc:ID': 'IBAN-1', 'cbc:Name': 'Main', 'cac:FinancialInstitutionBranch': { 'cbc:ID': '9998' } },
      'cac:PaymentMandate': { 'cbc:Id': 'M-1', 'cac:PayerFinancialAccount': { 'cbc:ID': 'DE-1' } },
    });
  });

  it('omits every optional sub-block when only paymentId is present', () => {
    // ❌ Negative: cardAccount, paymentMeansCode, mandate and financial account all absent.
    const result = encodePaymentMeans([{ paymentId: 'PAY-2' }]);
    expect(result?.[0]).toEqual({
      'cbc:PaymentMeansCode': undefined,
      'cbc:PaymentID': 'PAY-2',
      'cbc:PaymentDueDate': undefined,
      'cac:CardAccount': undefined,
      'cac:PayeeFinancialAccount': undefined,
      'cac:PaymentMandate': undefined,
    });
  });
});

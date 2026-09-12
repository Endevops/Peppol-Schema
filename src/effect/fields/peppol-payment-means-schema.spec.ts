// oxlint-disable vitest/expect-expect
import { DateTime } from 'effect';
import { TestSchema } from 'effect/testing';
import { describe, it } from 'vitest';

import { peppolPaymentMeansSchema } from './peppol-payment-means-schema';

describe('peppolPaymentMeansSchema', () => {
  const testSchema = new TestSchema.Asserts(peppolPaymentMeansSchema);
  const decode = testSchema.decoding();

  it('should parse a payment means code', async () => {
    await decode.succeed({ paymentMeansCode: { code: '30' } });
  });

  it('should parse with all optional groups', async () => {
    await decode.succeed(
      {
        cardAccount: { holderName: 'John', networkId: 'VISA', primaryAccountNumberId: '1234' },
        payeeFinancialAccount: { financialInstitutionBranch: { id: '9998' }, id: 'IBAN123', name: 'Seller' },
        paymentDueDate: '2024-02-15',
        paymentId: '432948234234234',
        paymentMandate: { id: 'm1', payerFinancialAccountId: { id: '12345676543' } },
        paymentMeansCode: { code: '30', name: 'Credit transfer' },
      },
      {
        cardAccount: { holderName: 'John', networkId: 'VISA', primaryAccountNumberId: '1234' },
        payeeFinancialAccount: { financialInstitutionBranch: { id: '9998' }, id: 'IBAN123', name: 'Seller' },
        paymentDueDate: DateTime.makeUnsafe('2024-02-15'),
        paymentId: '432948234234234',
        paymentMandate: { id: 'm1', payerFinancialAccountId: { id: '12345676543' } },
        paymentMeansCode: { code: '30', name: 'Credit transfer' },
      }
    );
  });

  it('should reject a missing paymentMeansCode', async () => {
    await decode.fail({}, 'Missing key\n  at ["paymentMeansCode"]');
  });

  it('should reject a missing payment means code', async () => {
    await decode.fail({ paymentMeansCode: {} }, 'Missing key\n  at ["paymentMeansCode"]["code"]');
  });

  it('should reject an invalid payment due date', async () => {
    await decode.fail(
      { paymentMeansCode: { code: '30' }, paymentDueDate: 'nope' },
      'Expected a string matching the RegExp ^\\d{4}-\\d{2}-\\d{2}Z?$\n  at ["paymentDueDate"]'
    );
  });

  it('should reject a card account without a networkId', async () => {
    await decode.fail({ paymentMeansCode: { code: '30' }, cardAccount: {} }, 'Missing key\n  at ["cardAccount"]["networkId"]');
  });
});

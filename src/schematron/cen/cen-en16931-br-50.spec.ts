/**
 * @description Unit tests for CEN-EN16931-BR-50.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br50 } from './cen-en16931-br-50';

describe('CEN-EN16931-BR-50', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br50(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.paymentMeans = [
      { paymentMeansCode: { code: '30' }, payeeFinancialAccount: { id: '', name: undefined, financialInstitutionBranch: undefined } },
    ];
    expect(validateCenEn16931Br50(document).passed).toEqual(false);
  });
});

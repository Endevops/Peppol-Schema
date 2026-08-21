/**
 * @description Unit tests for CEN-EN16931-BR-51.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br51 } from './cen-en16931-br-51';

describe('CEN-EN16931-BR-51', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br51(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.paymentMeans = [
      { ...document.paymentMeans[0], cardAccount: { holderName: 'Holder', networkId: 'VISA', primaryAccountNumberId: '1234567890123456' } },
    ];
    expect(validateCenEn16931Br51(document).passed).toEqual(false);
  });
});

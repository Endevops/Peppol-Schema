/**
 * @description Unit tests for CEN-EN16931-BR-30.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br30 } from './cen-en16931-br-30';

describe('CEN-EN16931-BR-30', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br30(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].invoicePeriod = { startDate: '2017-11-13', endDate: '2017-11-12' };
    expect(validateCenEn16931Br30(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-CO-03.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo03 } from './cen-en16931-br-co-03';

describe('CEN-EN16931-BR-CO-03', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo03(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxPointDate = '2017-11-13';
    document.invoicePeriod = { descriptionCode: '35', startDate: undefined, endDate: undefined };
    expect(validateCenEn16931BrCo03(document).passed).toEqual(false);
  });
});

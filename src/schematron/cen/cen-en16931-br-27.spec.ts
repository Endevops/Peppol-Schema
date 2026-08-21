/**
 * @description Unit tests for CEN-EN16931-BR-27.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br27 } from './cen-en16931-br-27';

describe('CEN-EN16931-BR-27', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br27(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].price.priceAmount = { ...document.invoiceLines[0].price.priceAmount, value: -1 };
    expect(validateCenEn16931Br27(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-CO-15.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo15 } from './cen-en16931-br-co-15';

describe('CEN-EN16931-BR-CO-15', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo15(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.legalMonetaryTotal.taxInclusiveAmount = { ...document.legalMonetaryTotal.taxInclusiveAmount, value: 1 };
    expect(validateCenEn16931BrCo15(document).passed).toEqual(false);
  });
});

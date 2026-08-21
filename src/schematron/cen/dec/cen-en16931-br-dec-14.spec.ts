/**
 * @description Unit tests for CEN-EN16931-BR-DEC-14.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec14 } from './cen-en16931-br-dec-14';

describe('CEN-EN16931-BR-DEC-14', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrDec14(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.legalMonetaryTotal.taxInclusiveAmount = { ...document.legalMonetaryTotal.taxInclusiveAmount, value: 1.234 };
    expect(validateCenEn16931BrDec14(document).passed).toEqual(false);
  });
});

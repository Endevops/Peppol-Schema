/**
 * @description Unit tests for CEN-EN16931-BR-DEC-12.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec12 } from './cen-en16931-br-dec-12';

describe('CEN-EN16931-BR-DEC-12', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrDec12(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.legalMonetaryTotal.taxExclusiveAmount = { ...document.legalMonetaryTotal.taxExclusiveAmount, value: 1.234 };
    expect(validateCenEn16931BrDec12(document).passed).toEqual(false);
  });
});

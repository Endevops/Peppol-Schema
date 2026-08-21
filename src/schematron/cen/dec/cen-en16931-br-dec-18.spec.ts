/**
 * @description Unit tests for CEN-EN16931-BR-DEC-18.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec18 } from './cen-en16931-br-dec-18';

describe('CEN-EN16931-BR-DEC-18', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrDec18(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.legalMonetaryTotal.payableAmount = { ...document.legalMonetaryTotal.payableAmount, value: 1.234 };
    expect(validateCenEn16931BrDec18(document).passed).toEqual(false);
  });
});

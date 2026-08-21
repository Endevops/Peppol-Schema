/**
 * @description Unit tests for CEN-EN16931-BR-DEC-13.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec13 } from './cen-en16931-br-dec-13';

describe('CEN-EN16931-BR-DEC-13', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrDec13(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals = document.taxTotals.map((total: any) => ({ ...total, taxAmount: { ...total.taxAmount, value: 331.256 } }));
    expect(validateCenEn16931BrDec13(document).passed).toEqual(false);
  });
});

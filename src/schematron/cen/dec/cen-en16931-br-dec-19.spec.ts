/**
 * @description Unit tests for CEN-EN16931-BR-DEC-19.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec19 } from './cen-en16931-br-dec-19';

describe('CEN-EN16931-BR-DEC-19', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrDec19(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals[0].taxableAmount = { ...document.taxTotals[0].taxSubtotals[0].taxableAmount, value: 1.234 };
    expect(validateCenEn16931BrDec19(document).passed).toEqual(false);
  });
});

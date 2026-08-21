/**
 * @description Unit tests for CEN-EN16931-BR-S-08.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrS08 } from './cen-en16931-br-s-08';

describe('CEN-EN16931-BR-S-08', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrS08(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals[0].taxableAmount = { ...document.taxTotals[0].taxSubtotals[0].taxableAmount, value: 50 };
    expect(validateCenEn16931BrS08(document).passed).toEqual(false);
  });
});

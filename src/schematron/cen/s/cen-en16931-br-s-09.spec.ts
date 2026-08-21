/**
 * @description Unit tests for CEN-EN16931-BR-S-09.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrS09 } from './cen-en16931-br-s-09';

describe('CEN-EN16931-BR-S-09', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrS09(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals[0].taxAmount = { ...document.taxTotals[0].taxSubtotals[0].taxAmount, value: 100 };
    expect(validateCenEn16931BrS09(document).passed).toEqual(false);
  });
});

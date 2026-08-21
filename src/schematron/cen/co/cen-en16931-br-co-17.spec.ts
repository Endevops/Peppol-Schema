/**
 * @description Unit tests for CEN-EN16931-BR-CO-17.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo17 } from './cen-en16931-br-co-17';

describe('CEN-EN16931-BR-CO-17', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo17(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals[0].taxAmount = { ...document.taxTotals[0].taxSubtotals[0].taxAmount, value: 1 };
    expect(validateCenEn16931BrCo17(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-O-11.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrO11 } from './cen-en16931-br-o-11';

describe('CEN-EN16931-BR-O-11', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrO11(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals = [
      {
        ...document.taxTotals[0].taxSubtotals[0],
        taxCategory: { ...document.taxTotals[0].taxSubtotals[0].taxCategory, id: 'O', percent: undefined },
      },
      document.taxTotals[0].taxSubtotals[0],
    ];
    expect(validateCenEn16931BrO11(document).passed).toEqual(false);
  });
});

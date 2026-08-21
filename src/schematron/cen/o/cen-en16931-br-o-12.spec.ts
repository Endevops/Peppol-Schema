/**
 * @description Unit tests for CEN-EN16931-BR-O-12.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrO12 } from './cen-en16931-br-o-12';

describe('CEN-EN16931-BR-O-12', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrO12(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals[0].taxCategory = { ...document.taxTotals[0].taxSubtotals[0].taxCategory, id: 'O', percent: undefined };
    expect(validateCenEn16931BrO12(document).passed).toEqual(false);
  });
});

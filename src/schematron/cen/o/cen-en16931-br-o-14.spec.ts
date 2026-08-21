/**
 * @description Unit tests for CEN-EN16931-BR-O-14.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrO14 } from './cen-en16931-br-o-14';

describe('CEN-EN16931-BR-O-14', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrO14(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals[0].taxCategory = { ...document.taxTotals[0].taxSubtotals[0].taxCategory, id: 'O', percent: undefined };
    expect(validateCenEn16931BrO14(document).passed).toEqual(false);
  });
});

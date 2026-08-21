/**
 * @description Unit tests for CEN-EN16931-BR-45.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br45 } from './cen-en16931-br-45';

describe('CEN-EN16931-BR-45', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br45(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals[0].taxableAmount = undefined;
    expect(validateCenEn16931Br45(document).passed).toEqual(false);
  });
});

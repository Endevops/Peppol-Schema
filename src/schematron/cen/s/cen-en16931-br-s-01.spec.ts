/**
 * @description Unit tests for CEN-EN16931-BR-S-01.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrS01 } from './cen-en16931-br-s-01';

describe('CEN-EN16931-BR-S-01', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrS01(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals = undefined;
    expect(validateCenEn16931BrS01(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-CO-18.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo18 } from './cen-en16931-br-co-18';

describe('CEN-EN16931-BR-CO-18', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo18(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals = document.taxTotals.map((total: any) => ({ ...total, taxSubtotals: undefined }));
    expect(validateCenEn16931BrCo18(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-S-07.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrS07 } from './cen-en16931-br-s-07';

describe('CEN-EN16931-BR-S-07', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrS07(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.allowanceCharges = document.allowanceCharges.map((ac: any) => ({ ...ac, taxCategory: { ...ac.taxCategory, percent: 0 } }));
    expect(validateCenEn16931BrS07(document).passed).toEqual(false);
  });
});

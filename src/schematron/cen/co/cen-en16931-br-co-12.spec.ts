/**
 * @description Unit tests for CEN-EN16931-BR-CO-12.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo12 } from './cen-en16931-br-co-12';

describe('CEN-EN16931-BR-CO-12', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo12(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.legalMonetaryTotal.chargeTotalAmount = { ...document.legalMonetaryTotal.chargeTotalAmount, value: 5 };
    expect(validateCenEn16931BrCo12(document).passed).toEqual(false);
  });
});

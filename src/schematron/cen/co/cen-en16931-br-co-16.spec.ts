/**
 * @description Unit tests for CEN-EN16931-BR-CO-16.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo16 } from './cen-en16931-br-co-16';

describe('CEN-EN16931-BR-CO-16', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo16(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.legalMonetaryTotal.payableAmount = { ...document.legalMonetaryTotal.payableAmount, value: 1 };
    expect(validateCenEn16931BrCo16(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-DEC-09.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrDec09 } from './cen-en16931-br-dec-09';

describe('CEN-EN16931-BR-DEC-09', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrDec09(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.legalMonetaryTotal.lineExtensionAmount = { ...document.legalMonetaryTotal.lineExtensionAmount, value: 1.234 };
    expect(validateCenEn16931BrDec09(document).passed).toEqual(false);
  });
});

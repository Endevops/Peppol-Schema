/**
 * @description Unit tests for CEN-EN16931-BR-AE-01.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrAe01 } from './cen-en16931-br-ae-01';

describe('CEN-EN16931-BR-AE-01', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrAe01(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].item.classifiedTaxCategory.id = 'AE';
    expect(validateCenEn16931BrAe01(document).passed).toEqual(false);
  });
});

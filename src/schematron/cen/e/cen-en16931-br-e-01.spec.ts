/**
 * @description Unit tests for CEN-EN16931-BR-E-01.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrE01 } from './cen-en16931-br-e-01';

describe('CEN-EN16931-BR-E-01', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrE01(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].item.classifiedTaxCategory.id = 'E';
    expect(validateCenEn16931BrE01(document).passed).toEqual(false);
  });
});

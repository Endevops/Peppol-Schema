/**
 * @description Unit tests for CEN-EN16931-BR-S-05.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrS05 } from './cen-en16931-br-s-05';

describe('CEN-EN16931-BR-S-05', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrS05(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].item.classifiedTaxCategory.percent = 0;
    expect(validateCenEn16931BrS05(document).passed).toEqual(false);
  });
});

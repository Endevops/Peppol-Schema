/**
 * @description Unit tests for CEN-EN16931-BR-Z-05.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrZ05 } from './cen-en16931-br-z-05';

describe('CEN-EN16931-BR-Z-05', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrZ05(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].item.classifiedTaxCategory = { ...document.invoiceLines[0].item.classifiedTaxCategory, id: 'Z', percent: 21 };
    expect(validateCenEn16931BrZ05(document).passed).toEqual(false);
  });
});

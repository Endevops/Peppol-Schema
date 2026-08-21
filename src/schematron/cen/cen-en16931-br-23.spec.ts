/**
 * @description Unit tests for CEN-EN16931-BR-23.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br23 } from './cen-en16931-br-23';

describe('CEN-EN16931-BR-23', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br23(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].invoicedQuantity = { value: 1 };
    expect(validateCenEn16931Br23(document).passed).toEqual(false);
  });
});

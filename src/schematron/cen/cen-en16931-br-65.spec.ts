/**
 * @description Unit tests for CEN-EN16931-BR-65.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br65 } from './cen-en16931-br-65';

describe('CEN-EN16931-BR-65', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br65(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].item.commodityClassifications[0].itemClassification.listId = undefined;
    expect(validateCenEn16931Br65(document).passed).toEqual(false);
  });
});

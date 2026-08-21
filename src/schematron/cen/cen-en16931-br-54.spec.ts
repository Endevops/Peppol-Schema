/**
 * @description Unit tests for CEN-EN16931-BR-54.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br54 } from './cen-en16931-br-54';

describe('CEN-EN16931-BR-54', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br54(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].item.additionalItemProperties = [{ name: '', value: 'v' }];
    expect(validateCenEn16931Br54(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-62.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br62 } from './cen-en16931-br-62';

describe('CEN-EN16931-BR-62', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br62(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.accountingSupplierParty.endpointId = { ...document.accountingSupplierParty.endpointId, schemeId: undefined };
    expect(validateCenEn16931Br62(document).passed).toEqual(false);
  });
});

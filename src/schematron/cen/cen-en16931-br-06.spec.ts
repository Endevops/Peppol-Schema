/**
 * @description Unit tests for CEN-EN16931-BR-06.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br06 } from './cen-en16931-br-06';

describe('CEN-EN16931-BR-06', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br06(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.accountingSupplierParty.partyLegalEntity.registrationName = '';
    expect(validateCenEn16931Br06(document).passed).toEqual(false);
  });
});

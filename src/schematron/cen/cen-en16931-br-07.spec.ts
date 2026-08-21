/**
 * @description Unit tests for CEN-EN16931-BR-07.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br07 } from './cen-en16931-br-07';

describe('CEN-EN16931-BR-07', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br07(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.accountingCustomerParty.partyLegalEntity.registrationName = '';
    expect(validateCenEn16931Br07(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-11.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br11 } from './cen-en16931-br-11';

describe('CEN-EN16931-BR-11', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br11(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.accountingCustomerParty.postalAddress.countryCode.identificationCode = '';
    expect(validateCenEn16931Br11(document).passed).toEqual(false);
  });
});

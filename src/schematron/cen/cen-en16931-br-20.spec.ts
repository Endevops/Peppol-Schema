/**
 * @description Unit tests for CEN-EN16931-BR-20.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br20 } from './cen-en16931-br-20';

describe('CEN-EN16931-BR-20', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br20(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxRepresentativeParty = {
      name: 'Rep',
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: '' } },
      partyTaxScheme: { companyId: 'FR123', taxSchemeId: { id: 'VAT' } },
    };
    expect(validateCenEn16931Br20(document).passed).toEqual(false);
  });
});

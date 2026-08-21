/**
 * @description Unit tests for CEN-EN16931-BR-18.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br18 } from './cen-en16931-br-18';

describe('CEN-EN16931-BR-18', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br18(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxRepresentativeParty = {
      name: '',
      postalAddress: document.accountingSupplierParty.postalAddress,
      partyTaxScheme: { companyId: 'FR123', taxSchemeId: { id: 'VAT' } },
    };
    expect(validateCenEn16931Br18(document).passed).toEqual(false);
  });
});

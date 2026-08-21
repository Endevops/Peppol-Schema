/**
 * @description Unit tests for CEN-EN16931-BR-56.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br56 } from './cen-en16931-br-56';

describe('CEN-EN16931-BR-56', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br56(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxRepresentativeParty = {
      name: 'Rep',
      postalAddress: document.accountingSupplierParty.postalAddress,
      partyTaxScheme: { companyId: '', taxSchemeId: { id: 'VAT' } },
    };
    expect(validateCenEn16931Br56(document).passed).toEqual(false);
  });
});

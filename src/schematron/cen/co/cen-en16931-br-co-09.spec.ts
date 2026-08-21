/**
 * @description Unit tests for CEN-EN16931-BR-CO-09.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo09 } from './cen-en16931-br-co-09';

describe('CEN-EN16931-BR-CO-09', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo09(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.accountingSupplierParty.partyTaxSchemes = [{ companyId: 'ZZ12345', taxSchemeId: { id: 'VAT' } }];
    expect(validateCenEn16931BrCo09(document).passed).toEqual(false);
  });
});

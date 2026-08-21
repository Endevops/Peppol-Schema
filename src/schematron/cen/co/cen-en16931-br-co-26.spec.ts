/**
 * @description Unit tests for CEN-EN16931-BR-CO-26.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo26 } from './cen-en16931-br-co-26';

describe('CEN-EN16931-BR-CO-26', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo26(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.accountingSupplierParty.partyTaxSchemes = undefined;
    document.accountingSupplierParty.partyIdentification = undefined;
    document.accountingSupplierParty.partyLegalEntity.companyId = undefined;
    expect(validateCenEn16931BrCo26(document).passed).toEqual(false);
  });
});

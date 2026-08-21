/**
 * @description Unit tests for CEN-EN16931-BR-O-02.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrO02 } from './cen-en16931-br-o-02';

describe('CEN-EN16931-BR-O-02', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrO02(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].item.classifiedTaxCategory.id = 'O';
    document.accountingSupplierParty.partyTaxSchemes = undefined;
    document.taxRepresentativeParty = undefined;
    expect(validateCenEn16931BrO02(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-S-04.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrS04 } from './cen-en16931-br-s-04';

describe('CEN-EN16931-BR-S-04', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrS04(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.accountingSupplierParty.partyTaxSchemes = undefined;
    document.taxRepresentativeParty = undefined;
    expect(validateCenEn16931BrS04(document).passed).toEqual(false);
  });
});

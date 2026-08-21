/**
 * @description Unit tests for NL-R-009 (order line reference requires order reference).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validateNlR009 } from './nl-r-009';

async function asDutch(document: PeppolDocument): Promise<PeppolDocument> {
  return {
    ...document,
    accountingSupplierParty: {
      ...document.accountingSupplierParty,
      partyTaxSchemes: [{ companyId: 'NL123456789', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingSupplierParty.postalAddress, countryCode: { identificationCode: 'NL' } },
    },
    accountingCustomerParty: {
      ...document.accountingCustomerParty,
      partyTaxSchemes: [{ companyId: 'NL987654321', taxSchemeId: { id: 'VAT' } }],
      postalAddress: { ...document.accountingCustomerParty.postalAddress, countryCode: { identificationCode: 'NL' } },
    },
  } as unknown as PeppolDocument;
}

describe('NL-R-009 (order line reference requires order reference)', () => {
  it('passes when not applicable', async () => {
    const document = await decodeBaseExample();
    expect(validateNlR009(document).passed).toEqual(true);
  });

  it('fails when a Dutch document has an order line reference but no order reference', async () => {
    const document = await asDutch(await decodeBaseExample());
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ orderLineReference?: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      orderReference: undefined,
      invoiceLines: [{ ...line, orderLineReference: { lineId: '1' } }, ...lines.slice(1)],
    } as unknown as PeppolDocument;
    expect(validateNlR009(altered).passed).toEqual(false);
  });

  it('passes when a Dutch document has both order line reference and order reference', async () => {
    const document = await asDutch(await decodeBaseExample());
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ orderLineReference?: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      orderReference: { id: 'ORD-1' },
      invoiceLines: [{ ...line, orderLineReference: { lineId: '1' } }, ...lines.slice(1)],
    } as unknown as PeppolDocument;
    expect(validateNlR009(altered).passed).toEqual(true);
  });
});

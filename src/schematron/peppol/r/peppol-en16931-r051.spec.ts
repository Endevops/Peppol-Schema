/**
 * @description Unit tests for PEPPOL-EN16931-R051 (all currency IDs equal document currency).
 */
/**
 * @effect-diagnostics nodeBuiltinImport:off
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample, decodeFixture, fixtures } from '#/test/test-utils';

import { validatePeppolEn16931R051 } from './peppol-en16931-r051';

describe('PEPPOL-EN16931-R051 (all currency IDs equal document currency)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R051(document).passed).toEqual(true);
  });

  it('fails when the payable amount uses a different currency', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      legalMonetaryTotal: { ...document.legalMonetaryTotal, payableAmount: { currencyId: 'USD', value: 100 } },
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R051(altered).passed).toEqual(false);
  });

  it('fails when a line extension amount uses a different currency', async () => {
    const document = await decodeBaseExample();
    const lines = (document as PeppolDocument & { invoiceLines: Array<{ lineExtensionAmount: unknown }> }).invoiceLines;
    const line = lines[0];
    if (!line) {
      throw new Error('base example has no invoice line');
    }
    const altered = {
      ...document,
      invoiceLines: [{ ...line, lineExtensionAmount: { currencyId: 'USD', value: 100 } }, ...lines.slice(1)],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R051(altered).passed).toEqual(false);
  });

  it('R051 should pass on the allowance example', async () => {
    const document = await decodeFixture(fixtures.allowance);
    expect(validatePeppolEn16931R051(document).passed).toEqual(true);
  });

  it('R051 should fail when a currency differs from the document currency', async () => {
    const document = await decodeFixture(fixtures.allowance);
    const altered = {
      ...document,
      legalMonetaryTotal: { ...document.legalMonetaryTotal, payableAmount: { ...document.legalMonetaryTotal.payableAmount, currencyId: 'USD' } },
    };
    expect(validatePeppolEn16931R051(altered).passed).toEqual(false);
  });
});

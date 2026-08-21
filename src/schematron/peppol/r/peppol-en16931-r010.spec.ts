/**
 * @description Unit tests for PEPPOL-EN16931-R010 (buyer electronic address).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R010 } from './peppol-en16931-r010';

describe('PEPPOL-EN16931-R010 (buyer electronic address)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R010(document).passed).toEqual(true);
  });

  it('fails when the customer endpoint is missing', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      accountingCustomerParty: { ...document.accountingCustomerParty, endpointId: undefined },
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R010(altered).passed).toEqual(false);
  });

  it('fails when the customer endpoint id is blank', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      accountingCustomerParty: { ...document.accountingCustomerParty, endpointId: { id: '  ', schemeId: '0088' } },
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R010(altered).passed).toEqual(false);
  });
});

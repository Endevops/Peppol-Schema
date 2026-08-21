/**
 * @description Unit tests for PEPPOL-EN16931-CL002 (allowance reason code).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931CL002 } from './peppol-en16931-cl002';

describe('PEPPOL-EN16931-CL002 (allowance reason code)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931CL002(document).passed).toEqual(true);
  });

  it('fails for an unsupported allowance reason code', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      allowanceCharges: [{ amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: false, allowanceChargeReasonCode: '9999' }],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931CL002(altered).passed).toEqual(false);
  });
});

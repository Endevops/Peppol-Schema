/**
 * @description Unit tests for PEPPOL-EN16931-CL003 (charge reason code).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931CL003 } from './peppol-en16931-cl003';

describe('PEPPOL-EN16931-CL003 (charge reason code)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931CL003(document).passed).toEqual(true);
  });

  it('fails for an unsupported charge reason code', async () => {
    const document = await decodeBaseExample();
    const altered = {
      ...document,
      allowanceCharges: [{ amount: { currencyId: 'EUR', value: 10 }, chargeIndicator: true, allowanceChargeReasonCode: 'ZZ' }],
    } as unknown as PeppolDocument;
    expect(validatePeppolEn16931CL003(altered).passed).toEqual(false);
  });
});

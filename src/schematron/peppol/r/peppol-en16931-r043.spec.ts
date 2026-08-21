/**
 * @description Unit tests for PEPPOL-EN16931-R043 (charge indicator value).
 */
import { describe, expect, it } from 'vitest';

import type { PeppolDocument } from '#/document';

import { decodeBaseExample } from '#/test/test-utils';

import { validatePeppolEn16931R043 } from './peppol-en16931-r043';

describe('PEPPOL-EN16931-R043 (charge indicator value)', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R043(document).passed).toEqual(true);
  });

  it('passes when all allowance/charge indicators are booleans', async () => {
    const document = await decodeBaseExample();
    expect(validatePeppolEn16931R043(document).passed).toEqual(true);
  });

  it('passes when there are no allowance/charges', async () => {
    const document = { ...(await decodeBaseExample()), allowanceCharges: undefined } as unknown as PeppolDocument;
    expect(validatePeppolEn16931R043(document).passed).toEqual(true);
  });
});

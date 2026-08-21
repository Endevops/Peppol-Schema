/**
 * @description Unit tests for CEN-EN16931-BR-CO-20.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo20 } from './cen-en16931-br-co-20';

describe('CEN-EN16931-BR-CO-20', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo20(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoiceLines[0].invoicePeriod = { startDate: undefined, endDate: undefined };
    expect(validateCenEn16931BrCo20(document).passed).toEqual(false);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-CO-19.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo19 } from './cen-en16931-br-co-19';

describe('CEN-EN16931-BR-CO-19', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo19(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.invoicePeriod = { startDate: undefined, endDate: undefined, descriptionCode: undefined };
    expect(validateCenEn16931BrCo19(document).passed).toEqual(false);
  });
});

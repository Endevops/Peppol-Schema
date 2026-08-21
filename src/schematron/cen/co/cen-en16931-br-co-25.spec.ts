/**
 * @description Unit tests for CEN-EN16931-BR-CO-25.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo25 } from './cen-en16931-br-co-25';

describe('CEN-EN16931-BR-CO-25', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo25(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.dueDate = undefined;
    document.paymentTerms = undefined;
    expect(validateCenEn16931BrCo25(document).passed).toEqual(false);
  });
});

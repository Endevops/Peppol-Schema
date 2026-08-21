/**
 * @description Unit tests for CEN-EN16931-BR-46.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br46 } from './cen-en16931-br-46';

describe('CEN-EN16931-BR-46', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br46(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.taxTotals[0].taxSubtotals[0].taxAmount = undefined;
    expect(validateCenEn16931Br46(document).passed).toEqual(false);
  });
});

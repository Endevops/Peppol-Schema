/**
 * @description Unit tests for CEN-EN16931-BR-CO-06.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCo06 } from './cen-en16931-br-co-06';

describe('CEN-EN16931-BR-CO-06', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCo06(document).passed).toEqual(true);
  });
});

/**
 * @description Unit tests for CEN-EN16931-BR-15.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br15 } from './cen-en16931-br-15';

describe('CEN-EN16931-BR-15', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br15(document).passed).toEqual(true);
  });
});

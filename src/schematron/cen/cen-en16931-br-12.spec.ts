/**
 * @description Unit tests for CEN-EN16931-BR-12.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br12 } from './cen-en16931-br-12';

describe('CEN-EN16931-BR-12', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br12(document).passed).toEqual(true);
  });
});

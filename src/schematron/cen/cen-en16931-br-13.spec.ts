/**
 * @description Unit tests for CEN-EN16931-BR-13.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br13 } from './cen-en16931-br-13';

describe('CEN-EN16931-BR-13', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br13(document).passed).toEqual(true);
  });
});

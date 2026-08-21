/**
 * @description Unit tests for CEN-EN16931-BR-14.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931Br14 } from './cen-en16931-br-14';

describe('CEN-EN16931-BR-14', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931Br14(document).passed).toEqual(true);
  });
});

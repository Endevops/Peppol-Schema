/**
 * @description Unit tests for CEN-EN16931-BR-CL-08.
 */
import { describe, expect, it } from 'vitest';

import { decodeBaseExample } from '#/test/test-utils';

import { validateCenEn16931BrCl08 } from './cen-en16931-br-cl-08';

describe('CEN-EN16931-BR-CL-08', () => {
  it('passes on the base example', async () => {
    const document = await decodeBaseExample();
    expect(validateCenEn16931BrCl08(document).passed).toEqual(true);
  });

  it('fails when the rule is violated', async () => {
    const document = (await decodeBaseExample()) as any;
    document.note = 'note #ZZ1#';
    expect(validateCenEn16931BrCl08(document).passed).toEqual(false);
  });
});

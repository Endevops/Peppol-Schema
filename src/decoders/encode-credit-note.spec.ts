import { afterEach, describe, expect, it, vi } from 'vitest';

import { encodeCreditNote } from './encode-credit-note';

describe('encodeCreditNote', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  const minimal = { taxTotals: [], legalMonetaryTotal: {}, creditNoteLines: [] } as never;

  it('includes the schema location when MODE is test', () => {
    const out = encodeCreditNote(minimal) as { CreditNote: Record<string, unknown> };
    expect(out.CreditNote['@xsi:schemaLocation']).toContain('urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2');
  });

  it('omits the schema location when MODE is not test', () => {
    vi.stubEnv('MODE', 'production');
    const out = encodeCreditNote(minimal) as { CreditNote: Record<string, unknown> };
    expect(out.CreditNote['@xsi:schemaLocation']).toBeUndefined();
  });
});

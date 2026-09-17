import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { creditNoteTypeCodesKeys } from '#/values/credit-notes-type-codes.generated';

/**
 * @description A credit note type code from the PEPPOL subset of UNCL 1001 (credit note).
 *
 * @example
 *   ```ts
 *   '81';
 *   ```;
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/UNCL1001-cn/
 * @see {@link creditNoteTypeCodesKeys}
 */
export class PeppolCreditNoteTypeCode extends opaque<PeppolCreditNoteTypeCode>()(Schema.Literals(creditNoteTypeCodesKeys)) {}

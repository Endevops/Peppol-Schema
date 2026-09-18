import { Schema } from 'effect';

import { mimeCodesKeys } from '#/values/mime-codes.generated';

/**
 * @description A MIME media type from the PEPPOL MIME code list.
 *
 * @example
 *   ```ts
 *   'text/csv';
 *   ```;
 *
 * @validations
 * - PEPPOL-EN16931-CL001: Attachment (MIME) type MUST come from the allowed list.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/MimeCode/
 * @see {@link mimeCodesKeys}
 */
export const PeppolMimeCode = Schema.Literals(mimeCodesKeys)
  .pipe(Schema.brand('PeppolMimeCode'))
  .annotate({ documentation: 'PEPPOL-EN16931-CL001: Mime code must be according to subset of IANA code list.' })
  .pipe(Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolMimeCode}.
 */
export type PeppolMimeCode = Schema.Schema.Type<typeof PeppolMimeCode>;

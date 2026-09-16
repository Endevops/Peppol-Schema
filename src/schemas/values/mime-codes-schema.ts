import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { mimeCodesKeys } from '#/values/mime-codes.generated';

/**
 * @description Validates a MIME media type against the PEPPOL MIME code list.
 *
 * @param error - The custom error message to use when validation fails.
 *
 * @returns An Effect schema that accepts only valid MIME types.
 *
 * @validations
 * - PEPPOL-EN16931-CL001: Attachment (MIME) type MUST come from the allowed list.
 *
 * @see https://docs.peppol.eu/poacc/billing/3.0/codelist/MimeCode/
 */
export class PeppolMimeCode extends opaque<PeppolMimeCode>()(
  Schema.Literals(mimeCodesKeys)
    .pipe(Schema.brand('PeppolMimeCode'))
    .annotate({ documentation: 'PEPPOL-EN16931-CL001: Mime code must be according to subset of IANA code list.' })
) {}

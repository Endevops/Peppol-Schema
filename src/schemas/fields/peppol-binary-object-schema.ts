import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolBase64 } from '#/schemas/utils/peppol-base-64-schema.ts';
import { PeppolMimeCode } from '#/schemas/values/mime-codes-schema.ts';

// RFC 4648 §5 — Base64url Encoding: URL/file-safe alphabet (A-Z a-z 0-9 - _), optional `=` padding.
// Effect port of `z.base64url()`: keeps the value as a plain string and only validates the shape.
const base64UrlSchema = Schema.String.check(Schema.isPattern(/^[A-Za-z0-9\-_]+={0,2}$/)).annotate({ message: 'Invalid base64url' });

/**
 * @description An attached document embedded in the Invoice as a Base64 encoded binary object, together with its MIME type and file name. Wraps the
 * `cbc:EmbeddedDocumentBinaryObject` element.
 *
 * @example
 *   ```ts
 *   { content: 'aHR0cHM6Ly90ZXN0LXZlZmEuZGlmaS5uby9wZXBwb2xiaXM=', mimeCode: 'text/csv', filename: 'Hours - spent.csv' }
 *   ```;
 *
 * @summary Binary object for attachments
 *
 * @name cbc:EmbeddedDocumentBinaryObject (+ @mimeCode, @filename)
 */
export class PeppolBinaryObject extends opaque<PeppolBinaryObject>()(
  Schema.Struct({
    /**
     * @description An attached document embedded as binary object (Base64) or sent together with the invoice.
     *
     * @example
     *   aHR0cHM6Ly90ZXN0LXZlZmEuZGlmaS5uby9wZXBwb2xiaXMvcG9hY2MvYmlsbGluZy8zLjAvYmlzLw==
     *
     * @summary Attached document
     *
     * @name `#text` (Base64 content)
     */
    content: Schema.Union([PeppolBase64, base64UrlSchema]),
    /**
     * @description The mime code of the attached document.
     *
     * @example
     *   text / csv;
     *
     * @summary Attached document Mime code
     *
     * @name `@mimeCode`
     */
    mimeCode: PeppolMimeCode,
    /**
     * @description The file name of the attached document.
     *
     * @example
     *   Hours - spent.csv;
     *
     * @summary Attached document Filename
     *
     * @name `@filename`
     */
    filename: Schema.String,
  })
) {}

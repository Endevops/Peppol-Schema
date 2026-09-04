import { Schema } from 'effect';

import { base64Schema } from '#/effect/utils/base-64';
import { mimeCodesSchema } from '#/effect/values/mime-code';

// RFC 4648 §5 — Base64url Encoding: URL/file-safe alphabet (A-Z a-z 0-9 - _), optional `=` padding.
// Effect port of `z.base64url()`: keeps the value as a plain string and only validates the shape.
const base64UrlSchema = Schema.String.check(Schema.isPattern(/^[A-Za-z0-9\-_]+={0,2}$/)).annotate({ message: 'Invalid base64url' });

/**
 * @summary Binary object for attachments
 *
 * @name cbc:EmbeddedDocumentBinaryObject (+ @mimeCode, @filename)
 */
export const binaryObjectSchema = Schema.Struct({
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
  content: Schema.Union([base64Schema, base64UrlSchema]),
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
  mimeCode: mimeCodesSchema('PEPPOL-EN16931-CL001: Mime code must be according to subset of IANA code list.'),
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
});

export type PeppolBinaryObject = typeof binaryObjectSchema.Type;

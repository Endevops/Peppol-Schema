import * as z from 'zod/mini';

import { base64Schema } from '#/schemas/utils/base-64';
import { mimeCodesSchema } from '#/schemas/values/mime-code';

/**
 * @summary Binary object for attachments
 *
 * @name cbc:EmbeddedDocumentBinaryObject (+ @mimeCode, @filename)
 */
export const binaryObjectSchema = z.object({
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
  content: z.union([z.base64(), z.base64url(), base64Schema]),
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
  filename: z.string(),
});

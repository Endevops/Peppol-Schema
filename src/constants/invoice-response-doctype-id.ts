import type { PeppolDocumentType } from '#/schemas/values/document-type-schema';

import { documentScheme } from '#/constants/document-scheme';

export const INVOICE_RESPONSE_DOCTYPE_ID =
  `${documentScheme}::urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2::ApplicationResponse##urn:fdc:peppol.eu:poacc:trns:invoice_response:3::2.1` as const satisfies PeppolDocumentType;

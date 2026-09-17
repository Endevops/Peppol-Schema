import { documentScheme } from '#/constants/document-scheme.ts';

/**
 * @description PEPPOL document type identifier for a UBL ApplicationResponse carrying a message level response. It combines the {@link documentScheme} scheme with
 * the UBL `ApplicationResponse-2` root element, the `urn:fdc:peppol.eu:poacc:trns:mlr:3` customization id, and version 2.1. The document schema it
 * identifies is {@link PeppolMessageLevelResponse}.
 *
 * @example
 *   ```ts
 *   MESSAGE_LEVEL_RESPONSE_DOCTYPE_ID; // 'busdox-docid-qns::urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2::...::2.1'
 *   ```;
 */
export const MESSAGE_LEVEL_RESPONSE_DOCTYPE_ID =
  `${documentScheme}::urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2::ApplicationResponse##urn:fdc:peppol.eu:poacc:trns:mlr:3::2.1` as const;

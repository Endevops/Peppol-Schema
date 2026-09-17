import { documentScheme } from '#/constants/document-scheme.ts';

/**
 * @description PEPPOL document type identifier for a UBL CreditNote. It combines the {@link documentScheme} scheme with the UBL `CreditNote-2` root element, the EN
 * 16931 / PEPPOL BIS Billing 3.0 customization id, and version 2.1. The document schema it identifies is {@link PeppolCreditNote}.
 *
 * @example
 *   ```ts
 *   CREDIT_NOTE_DOCTYPE_ID; // 'busdox-docid-qns::urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2::CreditNote##...::2.1'
 *   ```;
 */
export const CREDIT_NOTE_DOCTYPE_ID =
  `${documentScheme}::urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2::CreditNote##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1` as const;

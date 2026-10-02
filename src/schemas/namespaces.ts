/**
 * @description XML namespace URIs for the PEPPOL BIS Billing 3.0 schemas. The `xmlNamespace`, `xmlPrefix` and `xmlName` annotations are read by the XML codec
 * (`@endevops/effect-xml-codec`) to place each element and attribute in the right namespace and under the right wire name. Declaring the URIs as
 * constants keeps them consistent across every schema file instead of repeating the long URNs at each field.
 */

/**
 * @description Namespace URI of the UBL common basic components, written with the `cbc` prefix.
 */
export const CBC_NAMESPACE = 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2';

/**
 * @description Namespace URI of the UBL common aggregate components, written with the `cac` prefix.
 */
export const CAC_NAMESPACE = 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2';

/**
 * @description Namespace URI of the UBL Invoice document.
 */
export const INVOICE_NAMESPACE = 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2';

/**
 * @description Namespace URI of the UBL Credit Note document.
 */
export const CREDIT_NOTE_NAMESPACE = 'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2';

import type { InvoiceResponseDocumentReference, InvoiceResponseDocumentResponse } from '#/schemas/invoice-response-schema';
import type { PeppolInvoiceResponse } from '#/schemas/invoice-response-schema';

import { encodeMessageParty } from '#/decoders/fields/encode-message-party';

export function encodeInvoiceResponse(invoiceResponse: PeppolInvoiceResponse) {
  return {
    '?xml': { '@version': '1.0', '@encoding': 'UTF-8' },
    ApplicationResponse: {
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@xsi:schemaLocation':
        import.meta.env.MODE === 'test'
          ? 'urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2 https://docs.oasis-open.org/ubl/os-UBL-2.4/xsd/maindoc/UBL-ApplicationResponse-2.4.xsd urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2 https://docs.oasis-open.org/ubl/os-UBL-2.4/xsd/common/UBL-CommonAggregateComponents-2.4.xsd urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2 https://docs.oasis-open.org/ubl/os-UBL-2.4/xsd/common/UBL-CommonBasicComponents-2.4.xsd'
          : undefined,
      '@xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
      '@xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
      '@xmlns': 'urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2',
      'cbc:CustomizationID': invoiceResponse.customizationId,
      'cbc:ProfileID': invoiceResponse.profileId,
      'cbc:ID': invoiceResponse.id,
      'cbc:IssueDate': invoiceResponse.issueDate,
      'cbc:IssueTime': invoiceResponse.issueTime,
      'cbc:Note': invoiceResponse.note,
      'cac:SenderParty': encodeMessageParty(invoiceResponse.senderParty),
      'cac:ReceiverParty': encodeMessageParty(invoiceResponse.receiverParty),
      'cac:DocumentResponse': encodeDocumentResponse(invoiceResponse.documentResponse),
    },
  };
}

function encodeDocumentResponse(documentResponse: InvoiceResponseDocumentResponse) {
  if (!documentResponse) {
    return undefined;
  }
  return {
    'cac:Response': {
      'cbc:ResponseCode': documentResponse.response.responseCode,
      'cbc:EffectiveDate': documentResponse.response.effectiveDate,
      'cac:Status': documentResponse.response.status?.map(status => ({
        'cbc:StatusReasonCode': status.statusReasonCode
          ? { '#text': status.statusReasonCode.value, '@listID': status.statusReasonCode.listId }
          : undefined,
        'cbc:StatusReason': status.statusReason,
        'cac:Condition': status.condition?.map(condition => ({ 'cbc:AttributeID': condition.attributeId, 'cbc:Description': condition.description })),
      })),
    },
    'cac:DocumentReference': encodeDocumentReference(documentResponse.documentReference),
    'cac:IssuerParty': encodeMessageParty(documentResponse.issuerParty),
    'cac:RecipientParty': encodeMessageParty(documentResponse.recipientParty),
  };
}

function encodeDocumentReference(documentReference: InvoiceResponseDocumentReference) {
  if (!documentReference) return undefined;
  return { 'cbc:ID': documentReference.id, 'cbc:IssueDate': documentReference.issueDate, 'cbc:DocumentTypeCode': documentReference.documentTypeCode };
}

import { decodeInvoiceMessageDocumentParty, decodeInvoiceMessageParty, encodeMessageParty } from '#/decoders/fields/party';
import { getArray, getProp, strOrUnd } from '#/helpers';
import type { XmlNode } from '#/helpers';
import type {
  InvoiceReponseDocumentActualResponseStatus,
  InvoiceResponseCondition,
  InvoiceResponseDocumentActualResponse,
  InvoiceResponseDocumentReference,
  InvoiceResponseDocumentResponse,
  InvoiceResponseStatusReasonCode,
  PeppolInvoiceResponse,
} from '#/schemas/invoice-response';
import type { RecursivePartial } from '#/types';

function decodeStatusReasonCode(doc: XmlNode, ...path: Array<string>): RecursivePartial<InvoiceResponseStatusReasonCode> | undefined {
  const val = getProp(doc, ...path);
  if (!val && val !== 0) return undefined;
  const value = strOrUnd(val);
  if (typeof val === 'string' || typeof val === 'number') {
    return { value } as RecursivePartial<InvoiceResponseStatusReasonCode>;
  }
  if (!value) return undefined;
  return { listId: strOrUnd(val, '@listID'), value } as RecursivePartial<InvoiceResponseStatusReasonCode>;
}

function decodeCondition(doc: XmlNode, ...path: Array<string>): Array<RecursivePartial<InvoiceResponseCondition>> | undefined {
  const val = getArray(doc, ...path);
  if (!val) return undefined;
  return val.map(item => ({ attributeId: strOrUnd(item, 'cbc:AttributeID'), description: strOrUnd(item, 'cbc:Description') }));
}

function decodeDocumentResponseStatus(
  doc: XmlNode,
  ...path: Array<string>
): Array<RecursivePartial<InvoiceReponseDocumentActualResponseStatus>> | undefined {
  const val = getArray(doc, ...path);
  if (!val) return undefined;
  return val.map(item => ({
    condition: decodeCondition(item, 'cac:Condition'),
    statusReason: strOrUnd(item, 'cbc:StatusReason'),
    statusReasonCode: decodeStatusReasonCode(item, 'cbc:StatusReasonCode'),
  }));
}
function decodeDocumentActualResponse(doc: XmlNode, ...path: Array<string>): RecursivePartial<InvoiceResponseDocumentActualResponse> | undefined {
  const val = getProp(doc, ...path);
  if (!val) return undefined;
  return {
    effectiveDate: strOrUnd(val, 'cbc:EffectiveDate'),
    responseCode: strOrUnd(val, 'cbc:ResponseCode'),
    status: decodeDocumentResponseStatus(val, 'cac:Status'),
  };
}

function decodeDocumentResponse(doc: XmlNode, ...path: Array<string>): RecursivePartial<InvoiceResponseDocumentResponse> | undefined {
  const val = getProp(doc, ...path);
  if (!val) return undefined;
  return {
    documentReference: decodeDocumentReference(val, 'cac:DocumentReference'),
    issuerParty: decodeInvoiceMessageDocumentParty(val, 'cac:IssuerParty'),
    recipientParty: decodeInvoiceMessageDocumentParty(val, 'cac:RecipientParty'),
    response: decodeDocumentActualResponse(val, 'cac:Response'),
  };
}

function decodeDocumentReference(doc: XmlNode, ...path: Array<string>): RecursivePartial<InvoiceResponseDocumentReference> | undefined {
  const val = getProp(doc, ...path);
  if (!val) return undefined;
  return { documentTypeCode: strOrUnd(val, 'cbc:DocumentTypeCode'), id: strOrUnd(val, 'cbc:ID'), issueDate: strOrUnd(val, 'cbc:IssueDate') };
}

export function decodeInvoiceResponse(value: XmlNode): PeppolInvoiceResponse {
  const root = value || {};
  const doc: XmlNode = getProp(root, 'ubl:ApplicationResponse');
  const applicationResponse: RecursivePartial<PeppolInvoiceResponse> = {
    customizationId: strOrUnd(doc, 'cbc:CustomizationID'),
    documentResponse: decodeDocumentResponse(doc, 'cac:DocumentResponse'),
    id: strOrUnd(doc, 'cbc:ID'),
    issueDate: strOrUnd(doc, 'cbc:IssueDate'),
    issueTime: strOrUnd(doc, 'cbc:IssueTime'),
    note: strOrUnd(doc, 'cbc:Note'),
    profileId: strOrUnd(doc, 'cbc:ProfileID'),
    receiverParty: decodeInvoiceMessageParty(doc, 'cac:ReceiverParty'),
    senderParty: decodeInvoiceMessageParty(doc, 'cac:SenderParty'),
  };
  return applicationResponse as PeppolInvoiceResponse;
}

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

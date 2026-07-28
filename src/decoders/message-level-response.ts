import type { XmlNode } from '#/helpers';
import type {
  DocumentResponseLineResponseContent,
  PeppolMessageLevelDocumentResponseDocumentReference,
  PeppolMessageLevelDocumentResponseLineResponse,
  PeppolMessageLevelMessageLevelResponseDocumentResponse,
  PeppolMessageLevelResponse,
  PeppolMessageLevelResponseDocumentResponseDocument,
} from '#/schemas/message-level-response';
import type { RecursivePartial } from '#/types';

import { decodeMessageLevelParty, encodeMessageParty } from '#/decoders/fields/party';
import { getArray, getProp, strOrUnd } from '#/helpers';

function decodeDocumentResponse(
  doc: XmlNode,
  ...path: Array<string>
): RecursivePartial<PeppolMessageLevelMessageLevelResponseDocumentResponse> | undefined {
  const val = getProp(doc, ...path);
  if (!val) return undefined;
  return {
    documentReference: decodeDocumentReference(val, 'cac:DocumentReference'),
    lineResponse: decodeLineResponse(val, 'cac:LineResponse'),
    response: decodeResponse(val, 'cac:Response'),
  };
}

function decodeLineResponse(
  doc: XmlNode,
  ...path: Array<string>
): Array<RecursivePartial<PeppolMessageLevelDocumentResponseLineResponse>> | undefined {
  const val = getArray(doc, ...path);
  if (!val) return undefined;
  return val.map(val => ({
    lineReference: { lineId: strOrUnd(val, 'cac:LineReference', 'cbc:LineID') },
    response: decodeLineResponseContent(val, 'cac:Response'),
  }));
}

function decodeLineResponseContent(doc: XmlNode, ...path: Array<string>): RecursivePartial<DocumentResponseLineResponseContent> | undefined {
  const val = getProp(doc, ...path);
  if (!val) return undefined;
  return {
    description: strOrUnd(val, 'cbc:Description'),
    responseCode: strOrUnd(val, 'cbc:ResponseCode'),
    status: { statusReasonCode: strOrUnd(val, 'cac:Status', 'cbc:StatusReasonCode') },
  };
}

function decodeDocumentReference(
  doc: XmlNode,
  ...path: Array<string>
): RecursivePartial<PeppolMessageLevelDocumentResponseDocumentReference> | undefined {
  const val = getProp(doc, ...path);
  if (!val) return undefined;
  return { documentTypeCode: strOrUnd(val, 'cbc:DocumentTypeCode'), id: strOrUnd(val, 'cbc:ID'), versionId: strOrUnd(val, 'cbc:VersionID') };
}

function decodeResponse(doc: XmlNode, ...path: Array<string>): RecursivePartial<PeppolMessageLevelResponseDocumentResponseDocument> | undefined {
  const val = getProp(doc, ...path);
  if (!val) return undefined;
  return { description: strOrUnd(val, 'cbc:Description'), responseCode: strOrUnd(val, 'cbc:ResponseCode') };
}

export function decodeMessageLevelResponse(value: XmlNode): PeppolMessageLevelResponse {
  const root = value || {};
  const doc: XmlNode = getProp(root, 'ubl:ApplicationResponse');
  const applicationResponse: RecursivePartial<PeppolMessageLevelResponse> = {
    customizationId: strOrUnd(doc, 'cbc:CustomizationID'),
    documentResponse: decodeDocumentResponse(doc, 'cac:DocumentResponse'),
    id: strOrUnd(doc, 'cbc:ID'),
    issueDate: strOrUnd(doc, 'cbc:IssueDate'),
    issueTime: strOrUnd(doc, 'cbc:IssueTime'),
    profileId: strOrUnd(doc, 'cbc:ProfileID'),
    receiverParty: decodeMessageLevelParty(doc, 'cac:ReceiverParty'),
    senderParty: decodeMessageLevelParty(doc, 'cac:SenderParty'),
  };
  return applicationResponse as PeppolMessageLevelResponse;
}

export function encodeMessageLevelResponse(messageResponse: PeppolMessageLevelResponse) {
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
      'cbc:CustomizationID': messageResponse.customizationId,
      'cbc:ProfileID': messageResponse.profileId,
      'cbc:ID': messageResponse.id,
      'cbc:IssueDate': messageResponse.issueDate,
      'cbc:IssueTime': messageResponse.issueTime,
      'cac:SenderParty': encodeMessageParty(messageResponse.senderParty),
      'cac:ReceiverParty': encodeMessageParty(messageResponse.receiverParty),
      'cac:DocumentResponse': encodeMessageLevelDocumentResponse(messageResponse.documentResponse),
    },
  };
}

function encodeMessageLevelDocumentResponse(documentResponse: PeppolMessageLevelMessageLevelResponseDocumentResponse) {
  return {
    'cac:Response': { 'cbc:ResponseCode': documentResponse.response.responseCode, 'cbc:Description': documentResponse.response.description },
    'cac:DocumentReference': {
      'cbc:ID': documentResponse.documentReference.id,
      'cbc:DocumentTypeCode': documentResponse.documentReference.documentTypeCode,
      'cbc:VersionID': documentResponse.documentReference.versionId,
    },
    'cac:LineResponse': documentResponse.lineResponse.map(line => ({
      'cac:LineReference': { 'cbc:LineID': line.lineReference.lineId },
      'cac:Response': {
        'cbc:ResponseCode': line.response.responseCode,
        'cbc:Description': line.response.description,
        'cac:Status': { 'cbc:StatusReasonCode': line.response.status.statusReasonCode },
      },
    })),
  };
}

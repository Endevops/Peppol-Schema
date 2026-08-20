import type { XmlNode } from '#/helpers/get-prop';
import type { PeppolMessageLevelDocumentResponseDocumentReference } from '#/schemas/document-response-document-reference-schema';
import type { PeppolMessageLevelResponseDocumentResponseDocument } from '#/schemas/document-response-document-schema';
import type { DocumentResponseLineResponseContent } from '#/schemas/document-response-line-response-content';
import type { PeppolMessageLevelDocumentResponseLineResponse } from '#/schemas/document-response-line-response-schema';
import type { PeppolMessageLevelMessageLevelResponseDocumentResponse } from '#/schemas/message-level-response-document-response-schema';
import type { PeppolMessageLevelResponse } from '#/schemas/message-level-response-schema';
import type { RecursivePartial } from '#/types';

import { decodeMessageLevelParty } from '#/decoders/fields/decode-message-level-party';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

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

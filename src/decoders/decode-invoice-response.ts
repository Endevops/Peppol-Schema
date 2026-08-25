import type { XmlNode } from '#/helpers/get-prop';
import type { InvoiceResponseDocumentActualResponse } from '#/schemas/invoice-response-document-actual-response';
import type {
  InvoiceReponseDocumentActualResponseStatus,
  InvoiceResponseCondition,
} from '#/schemas/invoice-response-document-actual-response-status';
import type { InvoiceResponseDocumentReference, InvoiceResponseDocumentResponse } from '#/schemas/invoice-response-schema';
import type { PeppolInvoiceResponse } from '#/schemas/invoice-response-schema';
import type { InvoiceResponseStatusReasonCode } from '#/schemas/invoice-response-status-reason-code';
import type { RecursivePartial } from '#/types';

import { decodeInvoiceMessageDocumentParty } from '#/decoders/fields/decode-invoice-message-document-party';
import { decodeInvoiceMessageParty } from '#/decoders/fields/decode-invoice-message-party';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

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
  /* istanbul ignore next -- getArray never returns a falsy value */
  if (!val) return undefined;
  return val.map(item => ({ attributeId: strOrUnd(item, 'cbc:AttributeID'), description: strOrUnd(item, 'cbc:Description') }));
}

function decodeDocumentResponseStatus(
  doc: XmlNode,
  ...path: Array<string>
): Array<RecursivePartial<InvoiceReponseDocumentActualResponseStatus>> | undefined {
  const val = getArray(doc, ...path);
  /* istanbul ignore next -- getArray never returns a falsy value */
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
  } as RecursivePartial<InvoiceResponseDocumentActualResponse>;
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

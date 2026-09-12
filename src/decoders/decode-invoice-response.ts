import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';
import type { InvoiceResponseDocumentActualResponse } from '#/schemas/invoice-response-document-actual-response';
import type {
  InvoiceReponseDocumentActualResponseStatus,
  InvoiceResponseCondition,
} from '#/schemas/invoice-response-document-actual-response-status';
import type { InvoiceResponseDocumentReference, InvoiceResponseDocumentResponse, PeppolInvoiceResponse } from '#/schemas/invoice-response-schema';
import type { InvoiceResponseStatusReasonCode } from '#/schemas/invoice-response-status-reason-code';
import type { RecursivePartial } from '#/types';

import { decodeInvoiceMessageDocumentParty } from '#/decoders/fields/decode-invoice-message-document-party';
import { decodeInvoiceMessageParty } from '#/decoders/fields/decode-invoice-message-party';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';

const decodeStatusReasonCode = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (!Predicate.isTruthy(val) && val !== 0) return undefined;
  const value = yield* strOrUnd(val);
  if (Predicate.isString(val) || Predicate.isNumber(val)) {
    return { value } as RecursivePartial<InvoiceResponseStatusReasonCode>;
  }
  if (!Predicate.isTruthy(value)) return undefined;
  return { listId: yield* strOrUnd(val, '@listID'), value } as RecursivePartial<InvoiceResponseStatusReasonCode>;
});

const decodeCondition = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<InvoiceResponseCondition>> | undefined> {
  const val = yield* getArray(doc, ...path);
  /* istanbul ignore next -- getArray never returns a falsy value */
  if (Predicate.isNullish(val)) return undefined;
  return yield* Effect.forEach(
    val,
    Effect.fn(function* (item: XmlNode) {
      return { attributeId: yield* strOrUnd(item, 'cbc:AttributeID'), description: yield* strOrUnd(item, 'cbc:Description') };
    })
  );
});

const decodeDocumentResponseStatus = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getArray(doc, ...path);
  /* istanbul ignore next -- getArray never returns a falsy value */
  if (Predicate.isNullish(val)) return undefined;
  return yield* Effect.forEach(
    val,
    Effect.fn(function* (item: XmlNode) {
      return {
        condition: yield* decodeCondition(item, 'cac:Condition'),
        statusReason: yield* strOrUnd(item, 'cbc:StatusReason'),
        statusReasonCode: yield* decodeStatusReasonCode(item, 'cbc:StatusReasonCode'),
      } as RecursivePartial<InvoiceReponseDocumentActualResponseStatus>;
    })
  );
});

const decodeDocumentActualResponse = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<InvoiceResponseDocumentActualResponse> | undefined> {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    effectiveDate: yield* strOrUnd(val, 'cbc:EffectiveDate'),
    responseCode: yield* strOrUnd(val, 'cbc:ResponseCode'),
    status: yield* decodeDocumentResponseStatus(val, 'cac:Status'),
  } as RecursivePartial<InvoiceResponseDocumentActualResponse>;
});

const decodeDocumentReference = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<InvoiceResponseDocumentReference> | undefined> {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    documentTypeCode: yield* strOrUnd(val, 'cbc:DocumentTypeCode'),
    id: yield* strOrUnd(val, 'cbc:ID'),
    issueDate: yield* strOrUnd(val, 'cbc:IssueDate'),
  };
});

const decodeDocumentResponse = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<InvoiceResponseDocumentResponse> | undefined> {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    documentReference: yield* decodeDocumentReference(val, 'cac:DocumentReference'),
    issuerParty: yield* decodeInvoiceMessageDocumentParty(val, 'cac:IssuerParty'),
    recipientParty: yield* decodeInvoiceMessageDocumentParty(val, 'cac:RecipientParty'),
    response: yield* decodeDocumentActualResponse(val, 'cac:Response'),
  };
});

export const decodeInvoiceResponse = Effect.fn(function* (value: XmlNode): Effect.fn.Return<PeppolInvoiceResponse> {
  const root = value || {};
  const doc: XmlNode = yield* getProp(root, 'ubl:ApplicationResponse');
  const applicationResponse: RecursivePartial<PeppolInvoiceResponse> = {
    customizationId: yield* strOrUnd(doc, 'cbc:CustomizationID'),
    documentResponse: yield* decodeDocumentResponse(doc, 'cac:DocumentResponse'),
    id: yield* strOrUnd(doc, 'cbc:ID'),
    issueDate: yield* strOrUnd(doc, 'cbc:IssueDate'),
    issueTime: yield* strOrUnd(doc, 'cbc:IssueTime'),
    note: yield* strOrUnd(doc, 'cbc:Note'),
    profileId: yield* strOrUnd<'urn:fdc:peppol.eu:poacc:bis:invoice_response:3'>(doc, 'cbc:ProfileID'),
    receiverParty: yield* decodeInvoiceMessageParty(doc, 'cac:ReceiverParty'),
    senderParty: yield* decodeInvoiceMessageParty(doc, 'cac:SenderParty'),
  };
  return applicationResponse as PeppolInvoiceResponse;
});

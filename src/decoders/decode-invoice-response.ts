import { Effect, Predicate } from 'effect';

import type { XmlNode } from '#/helpers/get-prop.ts';

import { decodeApplicationResponseBase } from '#/decoders/fields/decode-application-response.ts';
import { decodeInvoiceMessageDocumentParty } from '#/decoders/fields/decode-invoice-message-document-party.ts';
import { decodeInvoiceMessageParty } from '#/decoders/fields/decode-invoice-message-party.ts';
import { getArray } from '#/helpers/get-array.ts';
import { getProp } from '#/helpers/get-prop.ts';
import { strOrUnd } from '#/helpers/str-or-und.ts';

const decodeStatusReasonCode = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (!Predicate.isTruthy(val) && val !== 0) return undefined;
  const value = yield* strOrUnd(val);
  if (Predicate.isString(val) || Predicate.isNumber(val)) {
    return { value };
  }
  if (!Predicate.isTruthy(value)) return undefined;
  return { listId: yield* strOrUnd(val, '@listID'), value };
});

const decodeCondition = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
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
      };
    })
  );
});

const decodeDocumentActualResponse = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    effectiveDate: yield* strOrUnd(val, 'cbc:EffectiveDate'),
    responseCode: yield* strOrUnd(val, 'cbc:ResponseCode'),
    status: yield* decodeDocumentResponseStatus(val, 'cac:Status'),
  };
});

const decodeDocumentReference = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    documentTypeCode: yield* strOrUnd(val, 'cbc:DocumentTypeCode'),
    id: yield* strOrUnd(val, 'cbc:ID'),
    issueDate: yield* strOrUnd(val, 'cbc:IssueDate'),
  };
});

const decodeDocumentResponse = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;

  return {
    documentReference: yield* decodeDocumentReference(val, 'cac:DocumentReference'),
    issuerParty: yield* decodeInvoiceMessageDocumentParty(val, 'cac:IssuerParty'),
    recipientParty: yield* decodeInvoiceMessageDocumentParty(val, 'cac:RecipientParty'),
    response: yield* decodeDocumentActualResponse(val, 'cac:Response'),
  };
});

export const decodeInvoiceResponse = Effect.fn(function* (value: XmlNode) {
  const { base, doc } = yield* decodeApplicationResponseBase(value);

  return {
    ...base,
    documentResponse: yield* decodeDocumentResponse(doc, 'cac:DocumentResponse'),
    note: yield* strOrUnd(doc, 'cbc:Note'),
    profileId: yield* strOrUnd<'urn:fdc:peppol.eu:poacc:bis:invoice_response:3'>(doc, 'cbc:ProfileID'),
    receiverParty: yield* decodeInvoiceMessageParty(doc, 'cac:ReceiverParty'),
    senderParty: yield* decodeInvoiceMessageParty(doc, 'cac:SenderParty'),
  };
});

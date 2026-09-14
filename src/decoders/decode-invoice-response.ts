import { Effect, Predicate, SchemaParser } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { decodeApplicationResponseBase } from '#/decoders/fields/decode-application-response';
import { decodeInvoiceMessageDocumentParty } from '#/decoders/fields/decode-invoice-message-document-party';
import { decodeInvoiceMessageParty } from '#/decoders/fields/decode-invoice-message-party';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';
import { PeppolInvoiceResponseDocumentActualResponseStatus } from '#/schemas/peppol-invoice-response-document-actual-response-status-schema';
import { PeppolInvoiceResponseCondition } from '#/schemas/peppol-invoice-response-document-actual-response-status-schema';
import {
  PeppolInvoiceResponse,
  PeppolInvoiceResponseDocumentReference,
  PeppolInvoiceResponseDocumentResponse,
} from '#/schemas/peppol-invoice-response-schema';
import { peppolInvoiceResponseStatusReasonCodeSchema } from '#/schemas/peppol-invoice-response-status-reason-code-schema';

const validateStatusReasonCode = SchemaParser.decodeUnknownEffect(peppolInvoiceResponseStatusReasonCodeSchema);
const decodeStatusReasonCode = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (!Predicate.isTruthy(val) && val !== 0) return undefined;
  const value = yield* strOrUnd(val);
  if (Predicate.isString(val) || Predicate.isNumber(val)) {
    return yield* validateStatusReasonCode({ value });
  }
  if (!Predicate.isTruthy(value)) return undefined;
  return yield* validateStatusReasonCode({ listId: yield* strOrUnd(val, '@listID'), value });
});

const validateCondition = SchemaParser.decodeUnknownEffect(PeppolInvoiceResponseCondition);
const decodeCondition = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getArray(doc, ...path);
  /* istanbul ignore next -- getArray never returns a falsy value */
  if (Predicate.isNullish(val)) return undefined;
  return yield* Effect.forEach(
    val,
    Effect.fn(function* (item: XmlNode) {
      return yield* validateCondition({
        attributeId: yield* strOrUnd(item, 'cbc:AttributeID'),
        description: yield* strOrUnd(item, 'cbc:Description'),
      });
    })
  );
});

const validateDocumentResponseStatus = SchemaParser.decodeUnknownEffect(PeppolInvoiceResponseDocumentActualResponseStatus);
const decodeDocumentResponseStatus = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getArray(doc, ...path);
  /* istanbul ignore next -- getArray never returns a falsy value */
  if (Predicate.isNullish(val)) return undefined;
  return yield* Effect.forEach(
    val,
    Effect.fn(function* (item: XmlNode) {
      return yield* validateDocumentResponseStatus({
        condition: yield* decodeCondition(item, 'cac:Condition'),
        statusReason: yield* strOrUnd(item, 'cbc:StatusReason'),
        statusReasonCode: yield* decodeStatusReasonCode(item, 'cbc:StatusReasonCode'),
      });
    })
  );
});

const validateDocumentActualResponse = SchemaParser.decodeUnknownEffect(PeppolInvoiceResponseDocumentActualResponseStatus);
const decodeDocumentActualResponse = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return yield* validateDocumentActualResponse({
    effectiveDate: yield* strOrUnd(val, 'cbc:EffectiveDate'),
    responseCode: yield* strOrUnd(val, 'cbc:ResponseCode'),
    status: yield* decodeDocumentResponseStatus(val, 'cac:Status'),
  });
});

const validateDocumentReference = SchemaParser.decodeUnknownEffect(PeppolInvoiceResponseDocumentReference);
const decodeDocumentReference = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return yield* validateDocumentReference({
    documentTypeCode: yield* strOrUnd(val, 'cbc:DocumentTypeCode'),
    id: yield* strOrUnd(val, 'cbc:ID'),
    issueDate: yield* strOrUnd(val, 'cbc:IssueDate'),
  });
});

const validateDocumentResponse = SchemaParser.decodeUnknownEffect(PeppolInvoiceResponseDocumentResponse);
const decodeDocumentResponse = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;

  return yield* validateDocumentResponse({
    documentReference: yield* decodeDocumentReference(val, 'cac:DocumentReference'),
    issuerParty: yield* decodeInvoiceMessageDocumentParty(val, 'cac:IssuerParty'),
    recipientParty: yield* decodeInvoiceMessageDocumentParty(val, 'cac:RecipientParty'),
    response: yield* decodeDocumentActualResponse(val, 'cac:Response'),
  });
});

const validatePeppolInvoiceResponse = SchemaParser.decodeUnknownEffect(PeppolInvoiceResponse);
export const decodeInvoiceResponse = Effect.fn(function* (value: XmlNode) {
  const { base, doc } = yield* decodeApplicationResponseBase(value);
  return yield* validatePeppolInvoiceResponse({
    ...base,
    documentResponse: yield* decodeDocumentResponse(doc, 'cac:DocumentResponse'),
    note: yield* strOrUnd(doc, 'cbc:Note'),
    profileId: yield* strOrUnd<'urn:fdc:peppol.eu:poacc:bis:invoice_response:3'>(doc, 'cbc:ProfileID'),
    receiverParty: yield* decodeInvoiceMessageParty(doc, 'cac:ReceiverParty'),
    senderParty: yield* decodeInvoiceMessageParty(doc, 'cac:SenderParty'),
  });
});

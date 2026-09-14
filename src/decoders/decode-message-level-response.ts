import { Effect, Predicate, SchemaParser } from 'effect';

import type { XmlNode } from '#/helpers/get-prop';

import { decodeApplicationResponseBase } from '#/decoders/fields/decode-application-response';
import { decodeMessageLevelParty } from '#/decoders/fields/decode-message-level-party';
import { getArray } from '#/helpers/get-array';
import { getProp } from '#/helpers/get-prop';
import { strOrUnd } from '#/helpers/str-or-und';
import { PeppolDocumentResponseDocumentReference } from '#/schemas/peppol-document-response-document-reference-schema';
import { PeppolDocumentResponseLineResponseContent } from '#/schemas/peppol-document-response-line-response-content-schema';
import { PeppolDocumentResponseLineResponse } from '#/schemas/peppol-document-response-line-response-schema';
import { PeppolMessageLevelResponseDocumentResponse } from '#/schemas/peppol-message-level-response-document-response-schema';
import { PeppolMessageLevelResponse } from '#/schemas/peppol-message-level-response-schema';

const validateDocumentResponse = SchemaParser.decodeUnknownEffect(PeppolMessageLevelResponseDocumentResponse);
const decodeDocumentResponse = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;

  return yield* validateDocumentResponse({
    documentReference: yield* decodeDocumentReference(val, 'cac:DocumentReference'),
    lineResponse: yield* decodeLineResponse(val, 'cac:LineResponse'),
    response: yield* decodeResponse(val, 'cac:Response'),
  });
});

const validateLineResponse = SchemaParser.decodeUnknownEffect(PeppolDocumentResponseLineResponse);
const decodeLineResponse = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getArray(doc, ...path);
  /* istanbul ignore next -- getArray never returns a falsy value */
  if (Predicate.isNullish(val)) return undefined;

  return yield* Effect.forEach(
    val,
    Effect.fn(function* (line: XmlNode) {
      return validateLineResponse({
        lineReference: { lineId: yield* strOrUnd(line, 'cac:LineReference', 'cbc:LineID') },
        response: yield* decodeLineResponseContent(line, 'cac:Response'),
      });
    })
  );
});

const validateLineResponseContent = SchemaParser.decodeUnknownEffect(PeppolDocumentResponseLineResponseContent);
const decodeLineResponseContent = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return yield* validateLineResponseContent({
    description: yield* strOrUnd(val, 'cbc:Description'),
    responseCode: yield* strOrUnd(val, 'cbc:ResponseCode'),
    status: { statusReasonCode: yield* strOrUnd<'BV' | 'BW' | 'SV'>(val, 'cac:Status', 'cbc:StatusReasonCode') },
  });
});

const validateDocumentReference = SchemaParser.decodeUnknownEffect(PeppolDocumentResponseDocumentReference);
const decodeDocumentReference = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return yield* validateDocumentReference({
    documentTypeCode: yield* strOrUnd(val, 'cbc:DocumentTypeCode'),
    id: yield* strOrUnd(val, 'cbc:ID'),
    versionId: yield* strOrUnd(val, 'cbc:VersionID'),
  });
});

const validateResponse = SchemaParser.decodeUnknownEffect(PeppolDocumentResponseLineResponseContent);
const decodeResponse = Effect.fn(function* (doc: XmlNode, ...path: Array<string>) {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return yield* validateResponse({ description: yield* strOrUnd(val, 'cbc:Description'), responseCode: yield* strOrUnd(val, 'cbc:ResponseCode') });
});

const validateMessageLevelResponse = SchemaParser.decodeUnknownEffect(PeppolMessageLevelResponse);
export const decodeMessageLevelResponse = Effect.fn(function* (value: XmlNode) {
  const { base, doc } = yield* decodeApplicationResponseBase(value);
  return yield* validateMessageLevelResponse({
    ...base,
    documentResponse: yield* decodeDocumentResponse(doc, 'cac:DocumentResponse'),
    profileId: yield* strOrUnd<'urn:fdc:peppol.eu:poacc:bis:mlr:3'>(doc, 'cbc:ProfileID'),
    receiverParty: yield* decodeMessageLevelParty(doc, 'cac:ReceiverParty'),
    senderParty: yield* decodeMessageLevelParty(doc, 'cac:SenderParty'),
  });
});

import { Effect, Predicate } from 'effect';

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

const decodeDocumentResponse = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolMessageLevelMessageLevelResponseDocumentResponse> | undefined> {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;

  return {
    documentReference: yield* decodeDocumentReference(val, 'cac:DocumentReference'),
    lineResponse: yield* decodeLineResponse(val, 'cac:LineResponse'),
    response: yield* decodeResponse(val, 'cac:Response'),
  } as RecursivePartial<PeppolMessageLevelMessageLevelResponseDocumentResponse>;
});

const decodeLineResponse = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<Array<RecursivePartial<PeppolMessageLevelDocumentResponseLineResponse>> | undefined> {
  const val = yield* getArray(doc, ...path);
  /* istanbul ignore next -- getArray never returns a falsy value */
  if (Predicate.isNullish(val)) return undefined;

  return yield* Effect.forEach(
    val,
    Effect.fn(function* (line: XmlNode) {
      return {
        lineReference: { lineId: yield* strOrUnd(line, 'cac:LineReference', 'cbc:LineID') },
        response: yield* decodeLineResponseContent(line, 'cac:Response'),
      };
    })
  );
});

const decodeLineResponseContent = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<DocumentResponseLineResponseContent> | undefined> {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    description: yield* strOrUnd(val, 'cbc:Description'),
    responseCode: yield* strOrUnd(val, 'cbc:ResponseCode'),
    status: { statusReasonCode: yield* strOrUnd<'BV' | 'BW' | 'SV'>(val, 'cac:Status', 'cbc:StatusReasonCode') },
  };
});

const decodeDocumentReference = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolMessageLevelDocumentResponseDocumentReference> | undefined> {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return {
    documentTypeCode: yield* strOrUnd(val, 'cbc:DocumentTypeCode'),
    id: yield* strOrUnd(val, 'cbc:ID'),
    versionId: yield* strOrUnd(val, 'cbc:VersionID'),
  };
});

const decodeResponse = Effect.fn(function* (
  doc: XmlNode,
  ...path: Array<string>
): Effect.fn.Return<RecursivePartial<PeppolMessageLevelResponseDocumentResponseDocument> | undefined> {
  const val = yield* getProp(doc, ...path);
  if (Predicate.isNullish(val)) return undefined;
  return { description: yield* strOrUnd(val, 'cbc:Description'), responseCode: yield* strOrUnd(val, 'cbc:ResponseCode') };
});

export const decodeMessageLevelResponse = Effect.fn(function* (value: XmlNode): Effect.fn.Return<PeppolMessageLevelResponse> {
  const root = value || {};
  const doc: XmlNode = yield* getProp(root, 'ubl:ApplicationResponse');
  const applicationResponse: RecursivePartial<PeppolMessageLevelResponse> = {
    customizationId: yield* strOrUnd(doc, 'cbc:CustomizationID'),
    documentResponse: yield* decodeDocumentResponse(doc, 'cac:DocumentResponse'),
    id: yield* strOrUnd(doc, 'cbc:ID'),
    issueDate: yield* strOrUnd(doc, 'cbc:IssueDate'),
    issueTime: yield* strOrUnd(doc, 'cbc:IssueTime'),
    profileId: yield* strOrUnd<'urn:fdc:peppol.eu:poacc:bis:mlr:3'>(doc, 'cbc:ProfileID'),
    receiverParty: yield* decodeMessageLevelParty(doc, 'cac:ReceiverParty'),
    senderParty: yield* decodeMessageLevelParty(doc, 'cac:SenderParty'),
  };

  return applicationResponse as PeppolMessageLevelResponse;
});

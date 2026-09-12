import { Effect, Predicate } from 'effect';

import type { PeppolMessageLevelMessageLevelResponseDocumentResponse } from '#/schemas/message-level-response-document-response-schema';
import type { PeppolMessageLevelResponse } from '#/schemas/message-level-response-schema';

import { PeppolEncodeError } from '#/decoders/errors';
import { encodeMessageParty } from '#/decoders/fields/encode-message-party';

export const encodeMessageLevelResponse = Effect.fn(function* (messageResponse: PeppolMessageLevelResponse) {
  return {
    '?xml': { '@version': '1.0', '@encoding': 'UTF-8' },
    ApplicationResponse: {
      '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
      '@xsi:schemaLocation':
        import.meta.env['MODE'] === 'test'
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
      'cac:SenderParty': yield* encodeMessageParty(messageResponse.senderParty),
      'cac:ReceiverParty': yield* encodeMessageParty(messageResponse.receiverParty),
      'cac:DocumentResponse': yield* encodeMessageLevelDocumentResponse(messageResponse.documentResponse),
    },
  };
});

const encodeMessageLevelDocumentResponse = Effect.fn(function* (
  documentResponse: PeppolMessageLevelMessageLevelResponseDocumentResponse | undefined
) {
  if (Predicate.isNullish(documentResponse)) {
    return yield* new PeppolEncodeError({ message: 'Cannot encode a message level response without a document response' });
  }
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
});

import { describe, expect, it } from '@effect/vitest';
import { Effect, Schema } from 'effect';

import { encodeMessageLevelResponse } from '#/decoders/encode-message-level-response.ts';
import { PeppolMessageLevelResponse } from '#/schemas/peppol-message-level-response-schema.ts';

describe('encodeMessageLevelResponse()', () => {
  const decodeMessageLevelResponse = Schema.decodeSync(PeppolMessageLevelResponse);
  const invoice = decodeMessageLevelResponse({
    customizationId: 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
    documentResponse: {
      documentReference: { documentTypeCode: '9', id: 'EnvelopeID-12456789', versionId: '2' },
      lineResponse: [
        {
          lineReference: { lineId: '/Catalogue/cac:CatalogueLine[3]/cac:Item[1]/cac:ClassifiedTaxCategory[1]/cbc:ID[1]' },
          response: {
            description: 'Validation gives error [CL-T77-R002]- Tax categories MUST be coded using UN/ECE 5305 code list',
            responseCode: 'RE',
            status: { statusReasonCode: 'BV' },
          },
        },
      ],
      response: { description: 'Rejected due to validation errore', responseCode: 'RE' },
    },
    id: 'MLR-ID123',
    issueDate: '2016-08-15',
    issueTime: '12:00:00',
    profileId: 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
    receiverParty: { endpointId: { id: '7315458756328', schemeId: '0088' } },
    senderParty: { endpointId: { id: '7300010000001', schemeId: '0088' } },
  });

  it.effect(
    'should encode an invoice to the xml structure',
    Effect.fn(function* () {
      const result = yield* encodeMessageLevelResponse(invoice).pipe(Effect.mapError(issue => new Schema.SchemaError(issue)));
      expect(result).toMatchSnapshot();
    })
  );
});

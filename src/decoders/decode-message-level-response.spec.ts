import { describe, expect, it } from '@effect/vitest';
import { Effect, Schema } from 'effect';

import { decodeMessageLevelResponse } from './decode-message-level-response';

describe('decodeMessageLevelResponse()', () => {
  it.effect(
    'decodes a fully populated message level response',
    Effect.fn(function* () {
      const out = yield* decodeMessageLevelResponse({
        '?xml': { '@encoding': 'UTF-8', '@version': '1.0' },
        ApplicationResponse: {
          '@xmlns': 'urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2',
          '@xmlns:cac': 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
          '@xmlns:cbc': 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
          '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          '@xsi:schemaLocation':
            'urn:oasis:names:specification:ubl:schema:xsd:ApplicationResponse-2 https://docs.oasis-open.org/ubl/os-UBL-2.4/xsd/maindoc/UBL-ApplicationResponse-2.4.xsd urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2 https://docs.oasis-open.org/ubl/os-UBL-2.4/xsd/common/UBL-CommonAggregateComponents-2.4.xsd urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2 https://docs.oasis-open.org/ubl/os-UBL-2.4/xsd/common/UBL-CommonBasicComponents-2.4.xsd',
          'cac:DocumentResponse': {
            'cac:DocumentReference': { 'cbc:DocumentTypeCode': '9', 'cbc:ID': 'EnvelopeID-12456789', 'cbc:VersionID': '2' },
            'cac:LineResponse': [
              {
                'cac:LineReference': { 'cbc:LineID': '/Catalogue/cac:CatalogueLine[3]/cac:Item[1]/cac:ClassifiedTaxCategory[1]/cbc:ID[1]' },
                'cac:Response': {
                  'cac:Status': { 'cbc:StatusReasonCode': 'BV' },
                  'cbc:Description': 'Validation gives error [CL-T77-R002]- Tax categories MUST be coded using UN/ECE 5305 code list',
                  'cbc:ResponseCode': 'RE',
                },
              },
            ],
            'cac:Response': { 'cbc:Description': 'Rejected due to validation errore', 'cbc:ResponseCode': 'RE' },
          },
          'cac:ReceiverParty': {
            'cac:Contact': undefined,
            'cac:PartyIdentification': undefined,
            'cac:PartyLegalEntity': undefined,
            'cac:PartyName': undefined,
            'cbc:EndpointID': { '#text': '7315458756328', '@schemeID': '0088' },
          },
          'cac:SenderParty': {
            'cac:Contact': undefined,
            'cac:PartyIdentification': undefined,
            'cac:PartyLegalEntity': undefined,
            'cac:PartyName': undefined,
            'cbc:EndpointID': { '#text': '7300010000001', '@schemeID': '0088' },
          },
          'cbc:CustomizationID': 'urn:fdc:peppol.eu:poacc:trns:mlr:3',
          'cbc:ID': 'MLR-ID123',
          'cbc:IssueDate': '2016-08-15',
          'cbc:IssueTime': '00:00:00',
          'cbc:ProfileID': 'urn:fdc:peppol.eu:poacc:bis:mlr:3',
        },
      }).pipe(Effect.mapError(issue => new Schema.SchemaError(issue)));
      expect(out).toMatchSnapshot('message-level-response');
    })
  );
});

import { Effect } from 'effect';
import XMLBuilder from 'fast-xml-builder';
import { XMLParser } from 'fast-xml-parser';
import * as z from 'zod/mini';

import type { PeppolCreditNote, PeppolInvoiceResponse, PeppolMessageLevelResponse } from '#/schemas';
import type { PeppolInvoice } from '#/schemas/invoice';

import { INVOICE_RESPONSE_PROFILE_ID } from '#/constants/invoice-response-profile-id';
import { MESSAGE_LEVEL_RESPONSE_PROFILE_ID } from '#/constants/message-level-response-profile-id';
import { decodeCreditNote } from '#/decoders/decode-credit-note';
import { decodeInvoice } from '#/decoders/decode-invoice';
import { decodeInvoiceResponse } from '#/decoders/decode-invoice-response';
import { decodeMessageLevelResponse } from '#/decoders/decode-message-level-response';
import { encodeCreditNote } from '#/decoders/encode-credit-note';
import { encodeInvoice } from '#/decoders/encode-invoice';
import { encodeInvoiceResponse } from '#/decoders/encode-invoice-response';
import { encodeMessageLevelResponse } from '#/decoders/encode-message-level-response';
import { PeppolDecodeError } from '#/decoders/errors';
import { strOrUnd } from '#/helpers/str-or-und';
import { creditNoteSchema } from '#/schemas/credit-note';
import { invoiceSchema } from '#/schemas/invoice';
import { invoiceResponseSchema } from '#/schemas/invoice-response-schema';
import { messageLevelResponse } from '#/schemas/message-level-response-schema';
import { builderOptions } from '#/xml/builder-options';
import { parserOptions } from '#/xml/parser-options';

/**
 * @deprecated use `PeppolDocumentParser` instead
 */
export const documentParser = z.codec(
  z.string(),
  z.xor([invoiceSchema, creditNoteSchema, messageLevelResponse, invoiceResponseSchema], 'invalid document'),
  {
    decode(value) {
      const parser = new XMLParser({ ...parserOptions, removeNSPrefix: true });
      const parsed = parser.parse(value);
      if (parsed.Invoice) {
        return Effect.runSync(decodeInvoice(parsed));
      } else if (parsed.CreditNote) {
        return Effect.runSync(decodeCreditNote(parsed));
      } else if (parsed.ApplicationResponse) {
        const profile = Effect.runSync(strOrUnd(parsed.ApplicationResponse, 'cbc:ProfileID'));
        if (profile === MESSAGE_LEVEL_RESPONSE_PROFILE_ID) {
          return Effect.runSync(decodeMessageLevelResponse(parsed));
        } else if (profile === INVOICE_RESPONSE_PROFILE_ID) {
          return Effect.runSync(decodeInvoiceResponse(parsed));
        }
      }
      throw new PeppolDecodeError({ message: `Unsupported document type: ${Object.keys(parsed).join(',')}` });
    },
    encode(value) {
      let content: unknown;
      if ('invoiceLines' in value) {
        content = Effect.runSync(encodeInvoice(value as PeppolInvoice));
      } else if ('creditNoteLines' in value) {
        content = Effect.runSync(encodeCreditNote(value as PeppolCreditNote));
      } else if ('documentResponse' in value) {
        if (value.profileId === MESSAGE_LEVEL_RESPONSE_PROFILE_ID) {
          content = Effect.runSync(encodeMessageLevelResponse(value as PeppolMessageLevelResponse));
        } else if (value.profileId === INVOICE_RESPONSE_PROFILE_ID) {
          content = Effect.runSync(encodeInvoiceResponse(value as PeppolInvoiceResponse));
        }
      }

      const builder = new XMLBuilder(builderOptions);
      return builder.build(content);
    },
  }
);

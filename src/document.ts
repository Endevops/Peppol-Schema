import type { AllUnionFields } from 'type-fest';

import type { PeppolCreditNote } from '#/schemas/credit-note';
import type { PeppolCreditNoteLine } from '#/schemas/fields/credit-note-line-schema';
import type { PeppolInvoiceLine } from '#/schemas/fields/invoice-line-schema';
import type { PeppolInvoice } from '#/schemas/invoice';
import type { PeppolInvoiceResponse } from '#/schemas/invoice-response-schema';
import type { PeppolMessageLevelResponse } from '#/schemas/message-level-response-schema';

/**
 * @description This defines the types of documents that are sent/received through the peppol network.
 */
export type PeppolDocument = AllUnionFields<PeppolInvoice | PeppolCreditNote>;
/**
 * @description This defines the types of message that are sent/received through the peppol network.
 */
export type PeppolMessage = AllUnionFields<PeppolMessageLevelResponse | PeppolInvoiceResponse>;
export type PeppolAllDocuments = AllUnionFields<PeppolDocument | PeppolMessage>;
export type PeppolDocumentLine = AllUnionFields<PeppolInvoiceLine | PeppolCreditNoteLine>;

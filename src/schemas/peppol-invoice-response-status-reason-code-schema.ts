import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { PeppolOpStatusAction } from '#/schemas/values/op-status-action-schema.ts';
import { PeppolOpStatusReason } from '#/schemas/values/op-status-reason-schema.ts';

/**
 * @description Status clarification reason (`cbc:StatusReasonCode` with `@listId="OPStatusReason"`), a value from the OPStatusReason code list.
 *
 * @example
 *   ```ts
 *   { value: 'REF', listId: 'OPStatusReason' }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseStatusReasonCode}
 */
export class PeppolInvoiceResponseStatusReasonCodeReason extends opaque<PeppolInvoiceResponseStatusReasonCodeReason>()(
  Schema.Struct({
    value: PeppolOpStatusReason,
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: Schema.Literal('OPStatusReason'),
  })
) {}

/**
 * @description Status clarification action (`cbc:StatusReasonCode` with `@listId="OPStatusAction"`), a value from the OPStatusAction code list.
 *
 * @example
 *   ```ts
 *   { value: 'PIN', listId: 'OPStatusAction' }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseStatusReasonCode}
 */
export class PeppolInvoiceResponseStatusReasonCodeAction extends opaque<PeppolInvoiceResponseStatusReasonCodeAction>()(
  Schema.Struct({
    value: PeppolOpStatusAction,
    /**
     * @description List identifier for clarification.
     *
     * @summary List identifier
     *
     * @name `@listId`
     */
    listId: Schema.Literal('OPStatusAction'),
  })
) {}

/**
 * @description Union of the accepted status clarification reasons and actions on an invoice response.
 *
 * @example
 *   ```ts
 *   { value: 'REF', listId: 'OPStatusReason' }
 *   ```;
 *
 * @see {@link PeppolInvoiceResponseDocumentActualResponseStatus}
 */
export class PeppolInvoiceResponseStatusReasonCode extends Schema.Union([
  PeppolInvoiceResponseStatusReasonCodeAction,
  PeppolInvoiceResponseStatusReasonCodeReason,
]) {}

import { Schema } from 'effect';

import { opStatusActionSchema } from '#/effect/values/op-status-action-schema';
import { opStatusReasonSchema } from '#/effect/values/op-status-reason-schema';

class PeppolInvoiceResponseStatusReasonCodeReason extends Schema.Opaque<PeppolInvoiceResponseStatusReasonCodeReason>()(
  Schema.Struct({
    value: opStatusReasonSchema,
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

class PeppolInvoiceResponseStatusReasonCodeAction extends Schema.Opaque<PeppolInvoiceResponseStatusReasonCodeAction>()(
  Schema.Struct({
    value: opStatusActionSchema,
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

export const peppolInvoiceResponseStatusReasonCodeSchema = Schema.Union([
  PeppolInvoiceResponseStatusReasonCodeAction,
  PeppolInvoiceResponseStatusReasonCodeReason,
]);

export type InvoiceResponseStatusReasonCode = typeof peppolInvoiceResponseStatusReasonCodeSchema.Type;
